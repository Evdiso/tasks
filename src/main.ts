import { createBitAccessor, createBitGetter } from "./tasks/task1";

const bitGetter = createBitGetter(new Uint8Array([0b1110, 0b1101]));
const bitAccessor = createBitAccessor(new Uint8Array([0b1110, 0b1101]));


// // Второй параметр это порядок бита "справа-налево"
console.log(bitGetter.get(0, 1)); // 1
console.log(bitGetter.get(1, 1)); // 0


// // Второй параметр это порядок бита "справа-налево"
bitAccessor.set(1, 1, 0); //
console.log(bitAccessor.get(1, 1));    // 0