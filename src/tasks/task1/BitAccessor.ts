import { BitGetter } from './BitGetter';
import { UintArrayBit } from './types';

export class BitAccessor extends BitGetter {
    constructor(unitArray: Uint8Array) {
        super(unitArray);
    }

    set(elem: number, bit: number, value: UintArrayBit): void {
        if (!this.checkInputData({elem, bit, size: this.elemSize}) && !this.checkSetBitData(value)) return;

        if (value === 1) {
            this.buffer[elem] = this.buffer[elem] | (0b1 << bit);
        } else {
            this.buffer[elem] = this.buffer[elem] & ~(0b1 << bit);
        }
    }

    checkSetBitData(value: UintArrayBit): boolean {
        const isValidData = value === 0 || value === 1;
        if (!isValidData) console.error('Wrong value data');
        return isValidData;
    }
}