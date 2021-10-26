import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  aboutShownState,
  isBufferingState,
  playerVolumeState,
  pomodoroShownState,
  stationsSelectorOpenState,
} from "../recoilState";
import stations from "../stations";
import getCloudfrontGifUrl from "../utils/getCloudfrontGifUrl";
import plausible from "../utils/plausible";
import Icon from "./Icon";
import { detectTouch } from "./Room";

const hasTouch = detectTouch();

function Selector({ currentStationId, setCurrentStationId, isPlaying }) {
  const [selectorOpen, setSelectorOpen] = useRecoilState(
    stationsSelectorOpenState
  );

  const setAboutShown = useSetRecoilState(aboutShownState);
  const setPomodoroShown = useSetRecoilState(pomodoroShownState);

  function chooseStation(event) {
    setCurrentStationId(event.target.value);
  }

  if (!currentStationId) return null;

  const currentStation = stations.find((s) => s.id === currentStationId);

  if (!currentStation) return null;

  const buttonCopy = (() => {
    if (!localStorage.stationClicked && !hasTouch) {
      return (
        <span>
          <span className="red" style={{ display: "inline" }}>
            click to change {" "}
          </span>
          {currentStation.name}
        </span>
      );
    } else {
      return <span>{currentStation.name}</span>;
    }
  })();

  function handleClick() {
    localStorage.setItem("stationClicked", "true");
    if (!selectorOpen) {
      plausible.track("Open Selector");
    }
    setAboutShown(false);
    setPomodoroShown(false);
    setSelectorOpen(!selectorOpen);
  }

  return (
    <div
      onChange={chooseStation}
      value={currentStationId}
      name="stations"
      id="stations-selector"
    >
      {
        <AnimatePresence>
          {selectorOpen && (
            <motion.div
              initial={{
                y: 60,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              exit={{
                y: 60,
                opacity: 0,
              }}
              transition={{
                type: "spring",
                duration: 0.3,
                bounce: 0.1,
              }}
              id="stations-list"
              onClick={() => setSelectorOpen(false)}
            >
              {stations.map((station) => {
                const isActive = station.id === currentStationId;
                return (
                  <div
                    className={"station-wrapper pointer"}
                    onClick={() => {
                      if (!isActive) {
                        setCurrentStationId(station.id);
                      }
                    }}
                  >
                    <div
                      className={
                        "station-thumbnail " +
                        (isActive ? "green-box-small" : "")
                      }
                      style={{
                        position: "relative",
                        backgroundImage: `url(${getCloudfrontGifUrl(
                          "station_thumb_" + station.id
                        )})`,
                      }}
                    >
                      <a
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        href={`https://www.youtube.com/watch?v=${station.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          position: "absolute",
                          top: 8,
                          right: 8,
                        }}
                      >
                        <Icon name="open" />
                      </a>{" "}
                    </div>
                    <span className="option" key={station.id}>
                      {station.name}
                    </span>
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      }
      <div
        id="stations-button"
        className="pointer"
        onClick={handleClick}
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "nowrap",
        }}
      >
        <AnimatedBeatsIcon isPlaying={isPlaying} /> {buttonCopy}
      </div>
    </div>
  );
}

const AnimatedBeatsIcon = ({ isPlaying }) => {
  const [iconIndex, setIconIndex] = useState(1);

  const playerVolume = useRecoilValue(playerVolumeState);
  const isBuffering = useRecoilValue(isBufferingState);

  const muted = playerVolume < 0.1 || !isPlaying;

  useEffect(() => {
    const interval = setInterval(() => {
      setIconIndex((prev) => (prev === 4 ? 1 : prev + 1));
    }, 250);
    return () => clearInterval(interval);
  }, []);

  return (
    <Icon
      name={
        !muted ? (isBuffering ? "buffering" : "beats") + iconIndex : "beatsMute"
      }
      style={{ marginRight: "8px" }}
    />
  );
};

export default Selector;
