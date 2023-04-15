interface IColors {
  red: number;
  green: number;
  blue: number;
}

interface IFilterProps extends Partial<IColors> {
  canvas?: HTMLCanvasElement;
}

const asyncImageLoader = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.src = url;
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('could not load image'));
  });
};

export const filter = ({ canvas, red, green, blue }: IFilterProps) => {
  let _canvas = canvas;
  let redColor = red ?? 0;
  let greenColor = green ?? 0;
  let blueColor = blue ?? 0;

  const changeCanvas = (img?: HTMLImageElement) => {
    if (_canvas) {
      const ctx = _canvas.getContext('2d', { willReadFrequently: true });
      if (ctx) {
        if (img) {
          ctx.drawImage(img, 0, 0);
        }

        const imageData = ctx.getImageData(0, 0, _canvas.width, _canvas.height);
        const { data } = imageData;

        for (let i = 0; i < data.length; i += 4) {
          data[i] = data[i] ^ redColor;
          data[i + 1] = data[i + 1] ^ greenColor;
          data[i + 2] = data[i + 2] ^ blueColor;
        }

        ctx.putImageData(imageData, 0, 0);
      }
    }
  };

  return {
    update: ({ red, green, blue }: IColors) => {
      redColor = red;
      greenColor = green;
      blueColor = blue;
      changeCanvas();
    },

    inverse: async (data: string | HTMLCanvasElement): Promise<HTMLCanvasElement> => {
      redColor = 255;
      greenColor = 255;
      blueColor = 255;

      if (typeof data === 'string') {
        if (!_canvas) {
          throw new Error('canvas element does not exist');
        }
        const img = await asyncImageLoader(data);
        changeCanvas(img);
        return _canvas;
      } else {
        _canvas = data;
        changeCanvas();
        return _canvas;
      }
    },
  };
};
