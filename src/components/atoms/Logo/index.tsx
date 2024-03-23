import icons8Popcorn from "@/assets/icons8-popcorn-100.png";

const Logo = ({ className }: { className?: string }) => {
  return (
    <img
      src={icons8Popcorn}
      alt={"logo"}
      className={`md:h-[70px] md:w-[70px] h-[50px] w-[50px]  object-contain ${className}`}
    />
  );
};

export default Logo;
