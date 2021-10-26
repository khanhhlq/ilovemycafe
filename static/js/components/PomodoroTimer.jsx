import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { pomodoroShownState } from "../recoilState";
import sounds from "../sounds";
import plausible from "../utils/plausible";
import Button from "./Button";
import FadeInDiv from "./FadeInDiv";

const REST_SECONDS = 5 * 60;
const WORK_SECONDS = 25 * 60;
const LONG_REST_SECONDS = 15 * 60;
const CYCLES = 4;

function PomodoroTimer() {
  const pomodoroShown = useRecoilValue(pomodoroShownState);

  const [timerSeconds, setTimerSeconds] = useState(WORK_SECONDS);
  const [isActive, setIsActive] = useState(false);
  const [rest, setRest] = useState(false);
  const cycle = useRef(CYCLES);

  const minutes = Math.floor(timerSeconds / 60).toString();
  const seconds = (timerSeconds - minutes * 60).toString();

  const timerClassName = (() => {
    if (rest === true) {
      return "blue";
    }
    if (isActive === true) {
      return "red";
    }
  })();

  function handleClick() {
    if (!isActive) {
      plausible.track("Start Pomodoro");
    }
    setIsActive(!isActive);
  }
  function resetTimer() {
    setIsActive(false);
    setTimerSeconds(WORK_SECONDS);
  }
  function addTime() {
    setTimerSeconds((s) => s + 300);
    if (!isActive) {
      setRest(false);
      setIsActive(true);

      sounds.endWork.play();
    }
  }
  // handle timer
  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        setTimerSeconds((s) => s - 1);
      }, 1000);

      //
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive]);

  // handle rest
  useEffect(() => {
    if (timerSeconds === 0) {
      setIsActive(false);
      // sounds.endWork.play();
      if (!rest) {
        setRest(true);

        cycle.current++;

        // Every 4 cycles, start long pause
        if (cycle.current % CYCLES === 0) {
          setTimerSeconds(LONG_REST_SECONDS);
          sounds.endWork.play();
        } else {
          setTimerSeconds(REST_SECONDS);
          sounds.endWork.play();
        }
      } else {
        setTimerSeconds(WORK_SECONDS);
        setRest(false);
        sounds.endPause.play();
      }
    }
  }, [timerSeconds, rest]);

  return (
    <FadeInDiv
      show={pomodoroShown}
      style={{
        textAlign: "right",
        marginTop: 15,
      }}
      className="vertical"
    >
      <span className={timerClassName}>
        {minutes.length === 2 ? minutes : "0" + minutes}:
        {seconds.length === 2 ? seconds : "0" + seconds}
      </span>

      {!isActive &&
      timerSeconds !== WORK_SECONDS &&
      timerSeconds !== REST_SECONDS &&
      timerSeconds !== LONG_REST_SECONDS ? (
        <div style={{ display: "flex" }}>
          <Button
            text="Continue"
            onClick={handleClick}
            style={{ marginRight: "8px" }}
          />{" "}
          <Button text="Stop" onClick={resetTimer} />
        </div>
      ) : (
        <Button text={isActive ? "Pause" : "Start"} onClick={handleClick} />
      )}
      {(!rest || (rest && !isActive)) && (
        <Button text="+5:00" onClick={addTime} />
      )}
    </FadeInDiv>
  );
}

export default PomodoroTimer;
