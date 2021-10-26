import { useMemo, useState } from "react";
import useEventListener from "../hooks/useEventListener";
import useFetch from "../hooks/useFetch";
import strings from "../strings";
import BlinkingDot from "./BlinkingDot";
import TypewriterText from "./TypewriterText";

const VisitorsCounter = () => {
  const [showCopy, setShowCopy] = useState(false);

  const [windowFocus, setWindowFocus] = useState(0);

  useEventListener("focus", () => {
    setWindowFocus(windowFocus + 1);
  });

  const currentVisits = useFetch(
    `s`,
    [windowFocus]
  );

  const currentVisitsValue = currentVisits?.response ?? 0;

  const formattedValue =
    currentVisitsValue && currentVisitsValue.toLocaleString("en");

  const copy = useMemo(
    () => strings.listeningNow + " " + formattedValue.toString(),
    [formattedValue]
  );

  if (!formattedValue || currentVisits?.response < 3) return null;

  return (
    <span className="red" id="visitors-counter">
      <TypewriterText
        delay={1000}
        className="red"
        onFinished={() => setShowCopy(true)}
      >
        {copy}
      </TypewriterText>
      {showCopy && (
        <BlinkingDot
          style={{ display: "inline-block", width: "10px", marginLeft: "4px" }}
          blinking
          className="red"
        />
      )}
    </span>
  );
};

export default VisitorsCounter;
