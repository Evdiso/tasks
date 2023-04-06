import { IBitGetter, ICheckParams } from "./types";

export class BitGetter implements IBitGetter {
    buffer: Uint8Array;
    elemSize: number;

    constructor(unitArray: Uint8Array) {
        this.buffer = unitArray;
        this.elemSize = unitArray.byteLength - 1;
    }

    get(elem: number, bit: number): number | null {
        if (this.checkInputData({ elem, bit, size: this.elemSize })) {
            return Number((this.buffer[elem] & (1 << bit)) !== 0);
        }
        return null;
    }

    checkInputData({ elem, bit, size }: ICheckParams): boolean {
        const isValidElem = elem <= size && elem >= 0;
        const isValidBit = bit >= 1 && bit <= 8;
        
        if (!isValidElem) console.error('Wrong array index');
        if (!isValidBit) console.error('Wrong bit index');
        
        return isValidElem && isValidBit;
    }
}