import { useRecoilState } from "recoil";
import useTweetStation from "../hooks/useTweetStation";
import { aboutShownState, pomodoroShownState } from "../recoilState";
import detectTouch from "../utils/detectTouch";
import plausible from "../utils/plausible";
import shareOnFacebook from "../utils/shareOnFacebook";
import Button from "./Button";

const hasTouch = detectTouch();

export default function RoomActions({ fullscreen, fullscreenAvailable }) {
  const [pomodoroShown, setPomodoroShown] = useRecoilState(pomodoroShownState);
  const [aboutShown, setAboutShown] = useRecoilState(aboutShownState);

  const tweetStation = useTweetStation();

  function handlePomodoroClick() {
    if (!pomodoroShown) {
      plausible.track("Open Pomodoro");
    }
    setPomodoroShown(!pomodoroShown);
    setAboutShown(false);
  }

  function handleAboutClick() {
    if (!aboutShown) {
      plausible.track("Open About");
    }
    setAboutShown(!aboutShown);
    setPomodoroShown(false);
  }

  return (
    <div id="horizontal">
      {fullscreenAvailable && (
        <Button
          className="hide-small-screen"
          tooltip="Fullscreen"
          icon={fullscreen.active ? "fullscreenExit" : "fullscreenEnter"}
          onClick={() =>
            fullscreen.active ? fullscreen.exit() : fullscreen.enter()
          }
          style={{ marginRight: "14px" }}
        />
      )}
      {!hasTouch && (
        <Button

        />
      )}
      <Button
        tooltip="Tweet"
        icon="twitter"
        onClick={tweetStation}
        style={{ marginRight: "14px" }}
      />
      <Button
        tooltip="Pomodoro Timer"
        icon="timer"
        onClick={handlePomodoroClick}
        style={{ marginRight: "14px" }}
      />
      <Button tooltip="About" icon="heart" onClick={handleAboutClick} />
    </div>
  );
}
