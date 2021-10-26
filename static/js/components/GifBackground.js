import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import gifs from "../gifs";
import {
  currentGifIndexState,
  nextGifIndexState,
  staticIndexState,
  staticShownState,
} from "../recoilState";
import staticGifs from "../staticGifs";
import getCloudfrontGifUrl from "../utils/getCloudfrontGifUrl";
import Gif from "./Gif";
import { getRandomIndex } from "./Player";

export default function GifBackground() {
  const currentGifIndex = useRecoilValue(currentGifIndexState);
  const staticShown = useRecoilValue(staticShownState);
  const staticIndex = useRecoilValue(staticIndexState);
  const nextGifIndex = useRecoilValue(nextGifIndexState);

  return (
    <>
      <Gif
        src={getCloudfrontGifUrl(staticGifs[staticIndex])}
        show={staticShown}
        zIndex={1}
      />
      <Gif src={getCloudfrontGifUrl(gifs[currentGifIndex])} />
      <Preload src={getCloudfrontGifUrl(staticGifs[staticIndex])} />
      <Preload src={getCloudfrontGifUrl(gifs[nextGifIndex])} />
    </>
  );
}

const Preload = ({ src }) => {
  return (
    <img
      src={src}
      alt="preload"
      style={{ position: "absolute", top: "100%", left: "100%" }}
    />
  );
};

export function useChangeGif() {
  const setCurrentGifIndex = useSetRecoilState(currentGifIndexState);
  const [nextGifIndex, setNextGifIndex] = useRecoilState(nextGifIndexState);

  function changeGif() {
    setCurrentGifIndex(nextGifIndex);
    const randomGifIndex = getRandomIndex(gifs, nextGifIndex);
    setNextGifIndex(randomGifIndex);
  }

  return changeGif;
}

export function useShowStatic() {
  const setStaticShown = useSetRecoilState(staticShownState);
  const [staticIndex, setStaticIndex] = useRecoilState(staticIndexState);

  function showStatic(duration) {
    setStaticShown(true);
    setTimeout(() => {
      // Hide static after a timeout
      setStaticShown(false);
      // Pick a random index for the next static effect
      const randomIndex = getRandomIndex(staticGifs, staticIndex);
      // Set it in the hook for later
      setStaticIndex(randomIndex);
    }, duration);
  }

  return showStatic;
}
