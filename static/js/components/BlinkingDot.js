import { useEffect, useState } from "react";

const BlinkingDot = ({ blinking, ...otherProps }) => {
  const [dot, setDot] = useState("•");
  useEffect(() => {
    if (blinking) {
      setTimeout(() => {
        if (dot === " ") setDot("•");
        if (dot === "•") setDot(` `);
      }, 600);
    } else {
      setDot("•");
    }
  }, [blinking, dot]);
  return <span {...otherProps}>{dot}</span>;
};

export default BlinkingDot;
