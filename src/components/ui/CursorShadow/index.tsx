import { ForwardedRef, forwardRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CursorShadow = forwardRef((_p, ref: ForwardedRef<HTMLDivElement>) => {
  return (
    <div
      className="bg-hover-background blur z-50 fixed h-[230px] top-0 left-0 aspect-square  rounded-full"
      ref={ref}
    />
  );
});

export default CursorShadow;
