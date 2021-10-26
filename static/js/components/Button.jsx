import React from "react";
import Icon from "./Icon";
import Tooltip from "./Tooltip";

function Button({
  onClick,
  text,
  style,
  icon,
  tooltip,
  type,
  value,
  className,
}) {
  return (
    <Tooltip content={tooltip} disabled={!tooltip}>
      <button
        onClick={onClick}
        type={type ?? "button"}
        value={value}
        style={{
          display: "flex",
          alignItems: "center",
          ...style,
          ...(text ? {} : { lineHeight: 0 }),
        }}
        className={className}
        title={tooltip}
      >
        {icon && <Icon name={icon} style={{ marginRight: text ? 8 : 0 }} />}
        {text && <span>{text}</span>}
      </button>
    </Tooltip>
  );
}

export default Button;
