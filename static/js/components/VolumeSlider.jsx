import React, { useEffect, useRef, useState } from "react";

function VolumeSlider({ volume, setVolume, style }) {
  const ref = useRef(null);

  const [clicking, setClicking] = useState(false);
  const [sliderCoordinates, setSliderCoordinates] = useState({ x: 0, w: 0 });

  function handleMouseDown(e) {
    setClicking(true);
    changeVolume(e);
  }

  function handleMouseUp(e) {
    setClicking(false);
  }

  function handleMouseMove(e) {
    if (clicking) {
      changeVolume(e);
    }
  }

  function changeVolume(e) {
    const mouseX = e.clientX;
    setVolume(
      Math.min(
        Math.max(
          round((mouseX - sliderCoordinates.x) / sliderCoordinates.w),
          0
        ),
        1
      )
    );
  }

  useEffect(() => {
    const rect = ref.current.getBoundingClientRect();
    setSliderCoordinates({ x: rect.x, w: rect.width });
  }, [volume]);

  return (
    <div style={{ userSelect: "none", ...style }}>
      <div
        onMouseDown={handleMouseDown}
        onMouseOut={handleMouseUp}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
        ref={ref}
        style={{
          width: "auto",
          display: "inline-block",
        }}
        className="pointer"
      >
        <Block volume={volume} on={volume > 0.02} />
        <Block volume={volume} on={volume > 0.1} />
        <Block volume={volume} on={volume > 0.2} />
        <Block volume={volume} on={volume > 0.3} />
        <Block volume={volume} on={volume > 0.4} />
        <Block volume={volume} on={volume > 0.5} />
        <Block volume={volume} on={volume > 0.6} />
        <Block volume={volume} on={volume > 0.7} />
        <Block volume={volume} on={volume > 0.8} />
        <Block volume={volume} on={volume > 0.9} />
      </div>
    </div>
  );
}

const Block = ({ on, volume }) => {
  return (
    <div
      className={volume > 0.02 ? "green-box" : "red-box"}
      style={{
        width: 6,
        height: 14,
        marginRight: 5,
        background: "white",
        display: "inline-block",
        pointerEvents: "none",
        opacity: on ? 1 : 0.5,
      }}
    />
  );
};

function round(num) {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

// return (
//   <input
//     onChange={(e) => setVolume(parseFloat(e.target.value))}
//     step="0.01"
//     type="range"
//     min="0"
//     max="1"
//     value={volume}
//     id="volume-slider"
//   ></input>
// );

export default VolumeSlider;
