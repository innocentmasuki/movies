import { ForwardedRef, forwardRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CursorShadow = forwardRef(
  (
    { hasPosition = false }: { hasPosition?: boolean },
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <div
        className={`bg-red-600 z-10  ${ref && "group-hover:opacity-100"} ${hasPosition && "top-0 left-0"} opacity-0 blur pointer-events-none  absolute h-[230px] aspect-square  rounded-full`}
        ref={ref}
      />
    );
  },
);

export default CursorShadow;
