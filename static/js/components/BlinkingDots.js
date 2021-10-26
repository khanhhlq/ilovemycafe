import { useEffect, useState } from "react";

const BlinkingDots = () => {
  const [dots, setDots] = useState("");
  useEffect(() => {
    setTimeout(() => {
      if (dots === "") setDots(".");
      if (dots === ".") setDots("..");
      if (dots === "..") setDots("...");
      if (dots === "...") setDots("");
    }, 300);
  }, [dots]);

  return dots;
};

export default BlinkingDots;
