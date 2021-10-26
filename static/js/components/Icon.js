import beats1Svg from "../images/glyphs/beats1.svg";
import beats2Svg from "../images/glyphs/beats2.svg";
import beats3Svg from "../images/glyphs/beats3.svg";
import beats4Svg from "../images/glyphs/beats4.svg";
import beatsMuteSvg from "../images/glyphs/beatsMute.svg";
import buffering1Svg from "../images/glyphs/buffering1.svg";
import buffering2Svg from "../images/glyphs/buffering2.svg";
import buffering3Svg from "../images/glyphs/buffering3.svg";
import buffering4Svg from "../images/glyphs/buffering4.svg";
import checkmarkSvg from "../images/glyphs/checkmark.svg";
import facebookSvg from "../images/glyphs/facebook.svg";
import forwardSvg from "../images/glyphs/forward.svg";
import fullscreenEnterSvg from "../images/glyphs/fullscreen-enter.svg";
import fullscreenExitSvg from "../images/glyphs/fullscreen-exit.svg";
import heartSvg from "../images/glyphs/heart.svg";
import mailSvg from "../images/glyphs/mail.svg";
import mailbrewSvg from "../images/glyphs/mailbrew.svg";
import openSvg from "../images/glyphs/open.svg";
import pauseSvg from "../images/glyphs/pause.svg";
import playSvg from "../images/glyphs/play.svg";
import previousSvg from "../images/glyphs/previous.svg";
import shuffleSvg from "../images/glyphs/shuffle.svg";
import timerSvg from "../images/glyphs/timer.svg";
import twitterSvg from "../images/glyphs/twitter.svg";

export default function Icon({ name, style }) {
  return (
    <img
      className="shadow"
      src={icons[name]}
      alt=""
      style={{ width: 20, height: 20, flex: "0 0 20px", ...style }}
    ></img>
  );
}

const icons = {
  shuffle: shuffleSvg,
  play: playSvg,
  pause: pauseSvg,
  forward: forwardSvg,
  previous: previousSvg,
  open: openSvg,
  timer: timerSvg,
  mail: mailSvg,
  heart: heartSvg,
  twitter: twitterSvg,
  facebook: facebookSvg,
  checkmark: checkmarkSvg,
  fullscreenEnter: fullscreenEnterSvg,
  fullscreenExit: fullscreenExitSvg,
  beats1: beats1Svg,
  beats2: beats2Svg,
  beats3: beats3Svg,
  beats4: beats4Svg,
  buffering1: buffering1Svg,
  buffering2: buffering2Svg,
  buffering3: buffering3Svg,
  buffering4: buffering4Svg,
  beatsMute: beatsMuteSvg,
  mailbrew: mailbrewSvg,
};
