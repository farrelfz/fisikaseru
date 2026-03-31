import * as React from "react";

type MotionProps<T> = React.HTMLAttributes<T> & {
  initial?: React.CSSProperties;
  animate?: React.CSSProperties;
  transition?: { duration?: number };
  whileHover?: React.CSSProperties;
};

type MotionFactory = {
  [K in keyof JSX.IntrinsicElements]: React.ForwardRefExoticComponent<
    MotionProps<HTMLElement> & React.RefAttributes<HTMLElement>
  >;
};

export const motion: MotionFactory;
