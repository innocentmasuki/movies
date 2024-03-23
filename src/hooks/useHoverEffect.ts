import { useRef } from "react";

const useHoverEffect = () => {
  const ref = useRef(null);
  return { ref };
};

export default useHoverEffect;
