import React from "react";
import { useRecoilValue } from "recoil";
import FabImage from "../images/avatars/Fab.png";
import MaryImage from "../images/avatars/Mary.png";
import { aboutShownState } from "../recoilState";
import strings from "../strings";
import Button from "./Button";
import FadeInDiv from "./FadeInDiv";
import Icon from "./Icon";

function About() {
  const aboutShown = useRecoilValue(aboutShownState);

  return (
    <FadeInDiv show={aboutShown} className="about-container">
      {/* <span style={{ marginBottom: 10, fontSize: "30px" }}>
        lofi.cafe
        <BlinkingCursor
          blinking
          style={{
            fontSize: "26px",
            display: "inline-block",
            marginLeft: "1px",
            width: "22px",
            lineHeight: 0,
            position: "relative",
            bottom: 3,
          }}
        />
      </span> */}
      <TeamMembers />
      <span style={{ marginBottom: "4px" }}>
        <span className="red">{strings.arrows}</span> {strings.changeStation}
      </span>
      <span style={{ marginBottom: "16px" }}>
        <span className="red">{strings.spacebar}</span> {strings.playPause}
      </span>
      <span style={{ marginBottom: "4px" }}>
        <span className="red">T</span> {strings.tweetThisStation}
      </span>
      <span style={{ marginBottom: "4px" }}>
        <span className="red">G</span> {strings.changeGif}
      </span>
      <span style={{ marginBottom: "12px" }}>
        <span className="red">V</span> {strings.showVideo}
      </span>
      <span style={{ marginBottom: "4px" }}>
        <span className="red">L</span> {strings.lowPowerMode}
      </span>
      <span style={{ marginBottom: "12px" }}>
        <span className="red">ESC</span> {strings.closeThis}
      </span>
      <NewsletterForm />
      <a href="mailto:hey@lofi.cafe">
        <Button text={strings.sayHi} />
      </a>
    </FadeInDiv>
  );
}

const TeamMembers = () => {
  return (
    <span style={{ display: "flex", marginBottom: "10px" }}>
      <TeamMember name="Fabrizio" username="linuz90" image={FabImage} />
      <TeamMember name="Marianna" username="maridivi89" image={MaryImage} />
    </span>
  );
};

const TeamMember = ({ name, username, image }) => {
  return (
    <a
      href={}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        textDecoration: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        marginLeft: "16px",
      }}
      className="team-member pointer"
    >
      <img
        style={{
          width: "80px",
          height: "80px",
          marginBottom: "3px",
        }}
        src={image}
        alt={name}
        className="green-box-small"
      />
      <span
        style={{ display: "block", textDecoration: "none", fontSize: "20px" }}
      >
        @{username}
      </span>
      {/* <span style={{ display: "block", fontSize: "18px" }}>@{username}</span> */}
    </a>
  );
};

const NewsletterForm = () => {
  return (
    <form
      action=""
      method="post"
      target="popupwindow"
      onSubmit="window.open()"
      className="embeddable-buttondown-form"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        marginBottom: "4px",
      }}
    >
      <span style={{ display: "block", marginBottom: "6px" }}>
        <Icon name="mail" style={{ position: "relative", bottom: "-3px" }} />{" "}
        {strings.updates}
      </span>
      <div
        style={{
          display: "flex",
          flexWrap: "nowrap",
          alignItems: "center",
        }}
      >
        <input
          type="email"
          className="green-box-small"
          placeholder="your@amazing.email"
          name="email"
          id="bd-email"
          style={{ width: "188px" }}
        />
        <input type="hidden" value="1" name="embed" />
        <button
          text="Subscribe"
          type="submit"
          value="Subscribe"
          style={{ flex: 0 }}
        >
          <Icon name="checkmark" style={{ marginLeft: "5px" }} />
        </button>
      </div>
    </form>
  );
};

export default About;
