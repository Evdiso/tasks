import { TEncodeData, TEncodeSchema } from './types';
import { createBitAccessor, createBitGetter } from '../task1';
import { UintArrayBit } from '../task1/types';

export const decode = (data: ArrayBuffer, schema: TEncodeSchema): TEncodeData => {
  const result: TEncodeData = [];
  const bitGetter = createBitGetter(new Uint8Array(data));

  let offset = 0;
  let bitOffset = 0;

  schema.forEach((item) => {
    const [bits, type] = item;

    if (type === 'number') {
      let num = '';

      for (let i = 0; i < bits; i++) {
        if (bitOffset === 8) {
          offset += 1;
          bitOffset = 0;
        }

        num = bitGetter.get(offset, bitOffset) + num;
        bitOffset += 1;
      }

      result.push(parseInt(num, 2));
    }

    if (type === 'ascii') {
      const stringBits = createBitAccessor(new Uint8Array(Math.ceil(bits / 8)));
      let internalOffset = stringBits.elemSize;
      let internalBitOffset = 0;

      for (let i = 0; i < bits; i++) {
        if (bitOffset === 8) {
          offset += 1;
          bitOffset = 0;
        }

        if (internalBitOffset === 8) {
          internalOffset -= 1;
          internalBitOffset = 0;
        }

        stringBits.set(
          internalOffset,
          internalBitOffset,
          bitGetter.get(offset, bitOffset) as UintArrayBit,
        );

        bitOffset += 1;
        internalBitOffset += 1;
      }

      result.push(new TextDecoder().decode(stringBits.buffer));
    }

    if (type === 'boolean') {
      if (bitOffset === 8) {
        offset += 1;
        bitOffset = 0;
      }

      result.push(Boolean(bitGetter.get(offset, bitOffset)));
      bitOffset += 1;
    }
  });

  return result;
};
