import { atom, DefaultValue, selector } from "recoil";
import { getRandomIndex } from "./components/Player";
import gifs from "./gifs";
import staticGifs from "./staticGifs";
import stations from "./stations";

const localStorageEffect =
  (key) =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue) => {
      if (newValue instanceof DefaultValue) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    });
  };

/* --------------------------------- Player --------------------------------- */

export const playerShownState = atom({
  key: "playerShown",
  default: false,
});

export const playerVolumeState = atom({
  key: "playerVolume",
  default: 0.7,
  effects_UNSTABLE: [localStorageEffect("playerVolume")],
});

export const isBufferingState = atom({
  key: "isBuffering",
  default: null,
});

export const currentStationIdState = atom({
  key: "currentStationId",
  default: stations[0].id,
  effects_UNSTABLE: [localStorageEffect("currentStationId")],
});

export const currentStationState = selector({
  key: "currentStation",
  get: ({ get }) => {
    const currentStationId = get(currentStationIdState);
    const currentStation = stations.find(
      (station) => station.id === currentStationId
    );
    if (currentStation) {
      return currentStation;
    } else {
      localStorage.removeItem("currentStationId");
      return stations[0];
    }
  },
});

export const currentStationIndexState = selector({
  key: "currentStationIndex",
  get: ({ get }) => {
    const currentStation = get(currentStationState);
    return stations.findIndex((station) => station === currentStation);
  },
});

/* -------------------------------- Features -------------------------------- */

export const pomodoroShownState = atom({
  key: "pomodoroShown",
  default: false,
});

export const aboutShownState = atom({
  key: "aboutShown",
  default: false,
});

export const stationsSelectorOpenState = atom({
  key: "stationsSelectorOpen",
  default: false,
});

/* -------------------------------- Settings -------------------------------- */

export const lowEnergyModeState = atom({
  key: "lowEnergyMode",
  default: false,
  effects_UNSTABLE: [localStorageEffect("lowEnergyMode")],
});

export const embedShownState = atom({
  key: "embedShown",
  default: false,
  effects_UNSTABLE: [localStorageEffect("embedShown")],
});

/* ---------------------------------- GIFs ---------------------------------- */

export const currentGifIndexState = atom({
  key: "currentGifIndex",
  default: 0,
  effects_UNSTABLE: [localStorageEffect("currentGifIndex")],
});
export const nextGifIndexState = atom({
  key: "nextGifIndex",
  default: getRandomIndex(gifs),
});
export const staticShownState = atom({
  key: "staticShown",
  default: false,
});
export const staticIndexState = atom({
  key: "staticIndex",
  default: getRandomIndex(staticGifs),
});
