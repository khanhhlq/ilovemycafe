import useEventListener from "./useEventListener";

export default function useKeysPressed(hotkeys = [], active = true) {
  useEventListener("keyup", (e) => {
    if (excludedTags.includes(e.target?.tagName)) {
      return;
    }
    handleKeyPress(e);
  });

  function handleKeyPress(e) {
    if (active) {
      hotkeys.forEach((hotkey) => {
        const { withShift } = hotkey[2] || {};
        if (
          hotkey[0] === "any" ||
          (e.key === hotkey[0] && (withShift === true ? e.shiftKey : true))
        ) {
          e.preventDefault();
          hotkey[1] && hotkey[1]();
        }
      });
    }
  }

  return null;
}

const excludedTags = ["INPUT", "TEXTAREA"];
