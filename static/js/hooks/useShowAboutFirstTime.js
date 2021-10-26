import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { aboutShownState } from "../recoilState";
import detectTouch from "../utils/detectTouch";
import useLocalStorage from "./useLocalStorage";

export default function useShowAboutFirstTime(isPlaying) {
  const [aboutShownFirstTime, setAboutShownFirstTime] = useLocalStorage(
    "aboutShown",
    false
  );
  const hasTouch = detectTouch();
  const setAboutShown = useSetRecoilState(aboutShownState);

  useEffect(() => {
    const windowSize = window.innerWidth;

    if (hasTouch || windowSize < 600) return;

    if (!aboutShownFirstTime && isPlaying) {
      const timeout = setTimeout(() => {
        setAboutShown(true);
        setAboutShownFirstTime(true);
      }, 1000);
      return () => clearTimeout(timeout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying]);
}
