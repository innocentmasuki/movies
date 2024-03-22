declare module "colorthief" {
  class ColorThief {
    getColor(
      sourceImage: HTMLImageElement,
      quality?: number,
    ): Promise<number[]>;
    getPalette(
      sourceImage: HTMLImageElement,
      colorCount?: number,
      quality?: number,
    ): Promise<number[][]>;
  }
  export default ColorThief;
}
