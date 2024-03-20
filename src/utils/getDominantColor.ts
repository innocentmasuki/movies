// @ts-ignore
import ColorThief from "colorthief";

export const getAvailableBrightest = (
  colors: number[][],
  intensity = 8,
): number[] => {
  return colors
    .map((opt: number[]) => {
      const h = 0.2126 * opt[0];
      const s = 0.7152 * opt[1];
      const l = 0.0722 * opt[2];
      return {
        color: opt,
        brightness: h + s + l,
      };
    })
    .sort(
      (a: { brightness: number }, b: { brightness: number }) =>
        b.brightness - a.brightness,
    )[intensity].color;
};

export function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}
