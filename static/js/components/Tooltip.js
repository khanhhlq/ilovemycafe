import Tippy from "@tippyjs/react";

export default function Tooltip(props) {
  return <Tippy touch={false} arrow={false} {...props} />;
}
