import { useEffect, useState } from "react";

const BlinkingCursor = ({ blinking, style }) => {
  const [cursor, setCursor] = useState("█");
  useEffect(() => {
    if (blinking) {
      setTimeout(() => {
        if (cursor === "") setCursor("█");
        if (cursor === "█") setCursor("");
      }, 600);
    } else {
      setCursor("█");
    }
  }, [blinking, cursor]);
  return (
    <span
      style={{
        marginLeft: "4px",
        fontSize: "100%",
        ...style,
      }}
    >
      {cursor}
    </span>
  );
};

export default BlinkingCursor;
