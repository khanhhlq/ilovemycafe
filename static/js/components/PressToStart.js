import { useState } from "react";
import strings from "../strings";
import detectTouch from "../utils/detectTouch";
import BlinkingCursor from "./BlinkingCursor";
import { containerInnerStyle } from "./Player";
import TypewriterText from "./TypewriterText";

const hasTouch = detectTouch();

export default function PressToStart() {
  const [blinking, setBlinking] = useState(false);

  const string = hasTouch ? strings.tapToStart : strings.pressToStart;

  return (
    <button style={containerInnerStyle}>
      <TypewriterText delay={1500} onFinished={() => setBlinking(true)}>
        {string}
      </TypewriterText>
      <BlinkingCursor blinking={blinking} />
    </button>
  );
}
