import React, { useCallback, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useRecoilState, useRecoilValue } from "recoil";
import useIsIOS from "../hooks/useIsIOS";
import useKeysPressed from "../hooks/useKeysPressed";
import {
  currentStationIdState,
  currentStationIndexState,
  currentStationState,
  embedShownState,
  isBufferingState,
  playerShownState,
  playerVolumeState,
  stationsSelectorOpenState,
} from "../recoilState";
import stations from "../stations";
import plausible from "../utils/plausible";
import BlinkingDots from "./BlinkingDots";
import Button from "./Button";
import Selector from "./Selector";
import Spacer from "./Spacer";
import VolumeSlider from "./VolumeSlider";

function Player({ onStationChanged, isPlaying, setIsPlaying }) {
  const show = useRecoilValue(playerShownState);

  const [stationsSelectorOpen, setStationsSelectorOpen] = useRecoilState(
    stationsSelectorOpenState
  );

  const [currentStationId, setCurrentStationId] = useRecoilState(
    currentStationIdState
  );
  const currentStation = useRecoilValue(currentStationState);
  const currentStationIndex = useRecoilValue(currentStationIndexState);

  const [reactPlayerLoading, setReactPlayerLoading] = useState(true);
  const [isBuffering, setIsBuffering] = useRecoilState(isBufferingState);
  const [longBuffering, setLongBuffering] = useState(null);
  const [playerVolume, setPlayerVolume] = useRecoilState(playerVolumeState);
  const [error, setError] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const playerShown = useRecoilValue(playerShownState);

  const [_embedShown, setEmbedShown] = useRecoilState(embedShownState);
  let embedShown = !error && playerShown && _embedShown;

  const isIOS = useIsIOS();

  function resetError() {
    setError(null);
    setErrorMsg("");
  }

  function handlePlaying(playing) {
    if (playing) {
      plausible.track("Player - Play");
    } else {
      plausible.track("Player - Pause");
    }
    setIsPlaying(playing);
  }

  const handleShufflePlay = useCallback(() => {
    resetError();
    setStationsSelectorOpen(false);
    const randomStationIndex = getRandomIndex(stations, currentStationIndex);
    setCurrentStationId(stations[randomStationIndex].id);
    onStationChanged();
    plausible.track("Player - Shuffle");
  }, [currentStationIndex, onStationChanged]);

  function handleGoBack() {
    resetError();
    setStationsSelectorOpen(false);
    const prevStationIndex = getPrevIndex(stations, currentStationIndex);
    setCurrentStationId(stations[prevStationIndex].id);
    onStationChanged();
    plausible.track("Player - Back");
  }

  function handleGoForward() {
    resetError();
    setStationsSelectorOpen(false);
    const nextStationIndex = getNextIndex(stations, currentStationIndex);
    setCurrentStationId(stations[nextStationIndex].id);
    onStationChanged();
    plausible.track("Player - Forward");
  }

  function volumeUp() {
    setPlayerVolume(Math.round(Math.min(playerVolume + 0.1, 1) * 10) / 10);
  }

  function volumeDown() {
    setPlayerVolume(Math.round(Math.max(playerVolume - 0.1, 0) * 10) / 10);
  }

  function handleShowOriginalVideo() {
    if (!embedShown) {
      plausible.track("Show original video");
    }

    setEmbedShown(!embedShown);
  }

  useKeysPressed(
    [
      ["ArrowRight", handleGoForward],
      ["ArrowLeft", handleGoBack],
      ["ArrowUp", volumeUp],
      ["ArrowDown", volumeDown],
      ["v", handleShowOriginalVideo],
      ["Escape", () => setStationsSelectorOpen(false)],
      [" ", () => handlePlaying(!isPlaying)],
    ],
    show
  );

  /* ----------------------------- Handle Loading ----------------------------- */

  useEffect(() => {
    let timeout;
    if (isBuffering) {
      timeout = setTimeout(() => {
        setLongBuffering(true);
      }, 3000);
      return () => clearTimeout(timeout);
    } else {
      clearTimeout(timeout);
      setLongBuffering(false);
    }
  }, [isBuffering, currentStation]);

  /* ------------------------------ Handle Error ------------------------------ */

  useEffect(() => {
    if (error === 150) {
      setErrorMsg("Ops, this station is not working. Skipping it");
      const timeout = setTimeout(() => {
        resetError();
        handleShufflePlay();
      }, 4000);
      return () => clearTimeout(timeout);
    }
  }, [error, handleShufflePlay]);

  return (
    <>
      <div style={{ ...containerInnerStyle, display: show ? "block" : "none" }}>
        {!stationsSelectorOpen && errorMsg && (
          <span className="red">
            {errorMsg}
            <BlinkingDots />
          </span>
        )}
        {!stationsSelectorOpen && !errorMsg && isBuffering && longBuffering && (
          <span className="red">
            Buffering
            <BlinkingDots />
          </span>
        )}
        <Spacer size={14} />
        {!reactPlayerLoading && (
          <div id="buttons-ui">
            <div style={buttonsStyle}>
              {!isPlaying && (
                <Button icon="play" onClick={() => handlePlaying(true)} />
              )}
              {isPlaying && (
                <Button icon="pause" onClick={() => handlePlaying(false)} />
              )}
              <Button icon="shuffle" onClick={handleShufflePlay} />
              <Button icon="previous" onClick={handleGoBack} />
              <Button icon="forward" onClick={handleGoForward} />
              {!isIOS && (
                <VolumeSlider
                  volume={playerVolume}
                  setVolume={setPlayerVolume}
                  style={{ marginLeft: "4px" }}
                />
              )}
            </div>
          </div>
        )}
        <Spacer size={12} />
        {!reactPlayerLoading && (
          <Selector
            isPlaying={isPlaying}
            currentStationId={currentStationId}
            setCurrentStationId={(station) => {
              setCurrentStationId(station);
              onStationChanged();
              handlePlaying(true);
            }}
          />
        )}
        {reactPlayerLoading && (
          <div id="buttons-ui">
            <LoadingText />
          </div>
        )}
      </div>
      <div
        style={embedShown ? wrapperStyle : hiddenStyle}
        className="yt-wrapper"
      >
        <div style={innerWrapperStyle}>
          <ReactPlayer
            controls={false}
            playing={isPlaying}
            url={"https://www.youtube.com/watch?v=" + currentStation.id}
            style={reactPlayerStyle}
            width="100vw"
            height="200vw"
            volume={playerVolume}
            config={{
              youtube: {
                playerVars: {
                  modestbranding: true,
                  color: "black",
                },
              },
            }}
            playsinline={true}
            onReady={() => setReactPlayerLoading(false)}
            onError={(err) => setError(err)}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onBuffer={() => setIsBuffering(true)}
            onBufferEnd={() => setIsBuffering(false)}
            onStart={() => setIsBuffering(false)}
            onEnded={() => handleShufflePlay()}
          />
        </div>
      </div>
    </>
  );
}

export function getRandomIndex(arr, currentIndex) {
  const randomIndex = Math.floor(Math.random() * arr.length);

  return randomIndex === currentIndex
    ? getRandomIndex(arr, currentIndex)
    : randomIndex;
}
function getNextIndex(arr, currentIndex) {
  const nextIndex = currentIndex + 1;
  return nextIndex > arr.length - 1 ? 0 : nextIndex;
}
function getPrevIndex(arr, currentIndex) {
  const prevIndex = currentIndex - 1;
  return prevIndex < 0 ? arr.length - 1 : prevIndex;
}

export const containerInnerStyle = {
  width: "100%",
  zIndex: 6,
};

const buttonsStyle = {
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
};

const wrapperStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 0,
  background: "black",
};

const hiddenStyle = {
  pointerEvents: "none",
  userSelect: "none",
  position: "fixed",
  top: "100%",
  left: "100%",
};

const innerWrapperStyle = {
  width: "100%",
  height: "100%",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "8px",
};

const reactPlayerStyle = {
  pointerEvents: "none",
  userSelect: "none",
  zIndex: -1,
  borderRadius: "8px",
};

const LoadingText = () => {
  const [dots, setDots] = useState("");
  useEffect(() => {
    setTimeout(() => {
      if (dots === "") setDots(".");
      if (dots === ".") setDots("..");
      if (dots === "..") setDots("...");
      if (dots === "...") setDots("");
    }, 300);
  }, [dots]);

  return <span>Loading{dots}</span>;
};
export default Player;
