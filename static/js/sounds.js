import bootFile from "./sounds/boot.mp3";
import staticAudioFile from "./sounds/static.mp3";
import endWorkFile from "./sounds/endWork.mp3";
import endPauseFile from "./sounds/endPause.mp3";


const staticAudio = new Audio(staticAudioFile);
const boot = new Audio(bootFile);
const endWork = new Audio(endWorkFile)
const endPause = new Audio (endPauseFile)

const sounds = {
  static: staticAudio,
  boot,
  endWork,
  endPause
};

export default sounds;
