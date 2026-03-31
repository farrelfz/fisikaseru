"use client";

const React = require("react");

function mergeStyles(base, extra) {
  return Object.assign({}, base || {}, extra || {});
}

const motion = new Proxy(
  {},
  {
    get: (_, tag) => {
      return React.forwardRef(function MotionComponent(props, ref) {
        const {
          initial,
          animate,
          transition,
          whileHover,
          style,
          children,
          onMouseEnter,
          onMouseLeave,
          ...rest
        } = props;

        const [hovered, setHovered] = React.useState(false);
        const mergedStyle = mergeStyles(
          mergeStyles(initial, animate),
          mergeStyles(style, hovered ? whileHover : undefined)
        );

        if (transition) {
          const duration = typeof transition.duration === "number" ? transition.duration : 0.3;
          mergedStyle.transition = `all ${duration}s ease`;
        }

        return React.createElement(
          tag,
          {
            ...rest,
            ref,
            style: mergedStyle,
            onMouseEnter: (e) => {
              setHovered(true);
              onMouseEnter && onMouseEnter(e);
            },
            onMouseLeave: (e) => {
              setHovered(false);
              onMouseLeave && onMouseLeave(e);
            }
          },
          children
        );
      });
    }
  }
);

module.exports = { motion };
