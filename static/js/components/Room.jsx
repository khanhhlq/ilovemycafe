import React, { useState } from "react";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { useRecoilState, useSetRecoilState } from "recoil";
import useKeysPressed from "../hooks/useKeysPressed";
import useShowAboutFirstTime from "../hooks/useShowAboutFirstTime";
import useStationFromUrl from "../hooks/useStationFromUrl";
import useTweetStation from "../hooks/useTweetStation";
import {
  aboutShownState,
  lowEnergyModeState,
  playerShownState,
  pomodoroShownState,
} from "../recoilState";
import sounds from "../sounds";
import strings from "../strings";
import detectFullscreenAvailable from "../utils/detectFullscreenAvailable";
import plausible from "../utils/plausible";
import About from "./About";
import GifBackground, { useChangeGif, useShowStatic } from "./GifBackground";
import Player from "./Player";
import PlayPauseArea from "./PlayPauseArea";
import PomodoroTimer from "./PomodoroTimer";
import PressToStart from "./PressToStart";
import RoomActions from "./RoomActions";
import VisitorsCounter from "./VisitorsCounter";

function Room() {
  const [playerShown, setPlayerShown] = useRecoilState(playerShownState);
  const [lowEnergyMode, setLowEnergyMode] = useRecoilState(lowEnergyModeState);
  const [isPlaying, setIsPlaying] = useState(false);
  const setPomodoroShown = useSetRecoilState(pomodoroShownState);
  const setAboutShown = useSetRecoilState(aboutShownState);

  const showStatic = useShowStatic();
  const changeGif = useChangeGif();
  const tweetStation = useTweetStation();
  useShowAboutFirstTime(isPlaying);
  useStationFromUrl();

  const locale = strings.getLanguage();
  const isJapanese = locale === "ja";

  const fs = useFullScreenHandle();
  const fsAvailable = detectFullscreenAvailable();

  function handleStationChanged(playSound = true) {
    plausible.track("Change Station");
    showStatic(300);
    if (playSound) sounds.static.play();
    changeGif();
  }

  function handleStart() {
    if (!playerShown) {
      setPlayerShown(true);
      setIsPlaying(true);
      // handleStationChanged();
    }
  }

  useKeysPressed([
    [
      "Escape",
      () => {
        setAboutShown(false);
        setPomodoroShown(false);
      },
    ],
    ["t", tweetStation],
    ["l", () => setLowEnergyMode(!lowEnergyMode)],
    ["g", changeGif],
    ["any", handleStart],
  ]);

  return (
    <FullScreen handle={fs}>
      <div
        id="container"
        className={[
          lowEnergyMode ? "low-energy" : "",
          !playerShown ? "pointer" : "",
          isJapanese ? "ja" : "",
        ]
          .join(" ")
          .trim()}
        onClick={handleStart}
      >
        {playerShown && (
          <PlayPauseArea isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
        )}
        <GifBackground />
        <div id="crt-lines" />
        <div id="darken" />
        <div id="vignette" />
        <div id="top-ui">
          <div>
            <VisitorsCounter />
          </div>

          <div className="vertical">
            {playerShown && (
              <RoomActions fullscreen={fs} fullscreenAvailable={fsAvailable} />
            )}

            <About />
            <PomodoroTimer />
          </div>
        </div>

        {!playerShown && <PressToStart />}
        <Player
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          onStationChanged={handleStationChanged}
        />
      </div>
    </FullScreen>
  );
}

export function detectTouch() {
  return "ontouchend" in document;
}

export default Room;
