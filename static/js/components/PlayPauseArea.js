import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import {
  aboutShownState,
  pomodoroShownState,
  stationsSelectorOpenState,
} from "../recoilState";
import Icon from "./Icon";

export default function PlayPauseArea({ isPlaying, setIsPlaying }) {
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (hovering) {
      const to = setTimeout(() => {
        setHovering(false);
      }, 1000);
      return () => clearTimeout(to);
    }
  }, [hovering]);

  const aboutShown = useRecoilValue(aboutShownState);
  const pomodoroShown = useRecoilValue(pomodoroShownState);
  const selectorOpen = useRecoilValue(stationsSelectorOpenState);

  function togglePlaying() {
    setIsPlaying(!isPlaying);
  }

  if (aboutShown || pomodoroShown || selectorOpen) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: "25%",
        right: "25%",
        bottom: "25%",
        left: "25%",
        cursor: "pointer",
        zIndex: 99,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onClick={togglePlaying}
    >
      <Icon
        name={isPlaying ? "pause" : "play"}
        style={{
          transform: `scale(${hovering ? 0.98 : 0.3})`,
          opacity: hovering ? 1 : 0,
          transition: "0.1s",
        }}
      />
    </div>
  );
}
