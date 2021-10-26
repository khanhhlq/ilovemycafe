import { useEffect, useRef, useState } from "react";

const TypewriterText = ({
  children,
  delay = 0,
  show = true,
  onFinished,
  style,
  className,
}) => {
  const [word, setWord] = useState("");
  const index = useRef(0);

  const length = children.length;

  useEffect(() => {
    if (show) {
      const timeout = setTimeout(() => {
        const interval = setInterval(() => {
          index.current++;
          setWord(children.toString().slice(0, index.current));
          if (index.current > length - 1) {
            clearInterval(interval);
            onFinished && onFinished();
          }
          return () => clearInterval(interval);
        }, 40);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [children, delay, length, onFinished, show, word]);

  return (
    <span style={style} className={className}>
      {word}
    </span>
  );
};

export default TypewriterText;
