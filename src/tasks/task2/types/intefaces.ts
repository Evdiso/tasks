type TEncodeItem = number | string | boolean;
type TEncodeItemType = 'ascii' | 'number' | 'boolean';

export type TEncodeSchema = [number, TEncodeItemType][];
export type TEncodeData = TEncodeItem[];
export type TEncodeResult = ArrayBuffer;
