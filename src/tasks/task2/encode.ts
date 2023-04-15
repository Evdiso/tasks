import { createBitAccessor } from '../task1';
import type { TEncodeSchema, TEncodeResult, TEncodeData } from './types';
import { UintArrayBit } from '../task1/types';

const getByteFromSchema = (schema: TEncodeSchema): number => {
  const result = schema.reduce((prev, current) => prev + current[0], 0);
  return Math.ceil(result / 8);
};

const assertCheckData = (bitLength: number, schemaBit: number): void => {
  if (bitLength !== schemaBit) {
    throw new Error('data does not match schema');
  }
};

export const encode = (data: TEncodeData, schema: TEncodeSchema): TEncodeResult => {
  const byteLen = getByteFromSchema(schema);

  const bitAccessor = createBitAccessor(new Uint8Array(byteLen));

  let offset = 0;
  let bitOffset = 0;

  data.forEach((value, index) => {
    const [bits, type] = schema[index];

    if (bitOffset === 8) {
      offset += 1;
      bitOffset = 0;
    }

    if (type !== 'boolean') {
      let data = '';
      let count = 0;

      if (type === 'number') {
        let bitsString = value.toString(2);

        assertCheckData(bitsString.length <= bits ? bits : bits + 1, bits);

        if (bitsString.length < bits) {
          const diff = bits - bitsString.length;

          for (let i = 0; i < diff; i++) {
            bitsString = '0' + bitsString;
          }
        }

        data = bitsString;
        count = bits;
      }

      if (type === 'ascii') {
        const str = new TextEncoder().encode(value as string);
        assertCheckData(str.byteLength * 8, bits);

        const bitsString = str
          .toString()
          .split(',')
          .reduce((prev, curr) => prev + `0${Number(curr).toString(2)}`, '');

        count = bitsString.length;
        data = bitsString;
      }

      for (let i = count - 1; i >= 0; i--) {
        if (bitOffset === 8) {
          offset += 1;
          bitOffset = 0;
        }

        const value = Number(data[i] || 0) as UintArrayBit;

        bitAccessor.set(offset, bitOffset, value);
        bitOffset += 1;
      }
    } else {
      assertCheckData(1, bits);
      bitAccessor.set(offset, bitOffset, Number(value) as UintArrayBit);
      bitOffset += 1;
    }
  });

  return bitAccessor.buffer;
};
