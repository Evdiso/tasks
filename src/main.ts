import { createBitAccessor, createBitGetter } from './tasks/task1';
import { encode } from './tasks/task2';
import { TEncodeSchema } from './tasks/task2/types';
import { decode } from './tasks/task2/decode';
import { filter } from './tasks/task2/filrter';
import './styles.css';

const imageUrl =
  'https://www.swd.uk.com/wp-content/uploads/SWD_HOLDING_P1_LK_MUGSHOTS-500x500px.jpg';

const bitGetter = createBitGetter(new Uint8Array([0b1110, 0b1101]));
const bitAccessor = createBitAccessor(new Uint8Array([0b1110, 0b1101]));

// Второй параметр это порядок бита "справа-налево"
console.log(bitGetter.get(0, 1)); // 1
console.log(bitGetter.get(1, 1)); // 0

// Второй параметр это порядок бита "справа-налево"
bitAccessor.set(1, 1, 0); //
console.log(bitAccessor.get(1, 1)); // 0

const schema: TEncodeSchema = [
  [3, 'number'],
  [3, 'number'],
  [1, 'boolean'],
  [1, 'boolean'],
  [16, 'ascii'],
];

// Если данные не подходят схеме - выбрасывать исключения с пояснением.
// Результат - ArrayBuffer.
const data = encode([2, 3, true, false, 'cb'], schema);
console.log(decode(data, schema));

window.document.addEventListener('DOMContentLoaded', () => {
  const redInput = document.getElementById('red') as HTMLInputElement;
  const greenInput = document.getElementById('green') as HTMLInputElement;
  const blueInput = document.getElementById('blue') as HTMLInputElement;

  const canvas = document.getElementById('canvas') as HTMLCanvasElement | null;
  const image = document.querySelector('#img');

  if (canvas) {
    const { inverse, update } = filter({ canvas });
    inverse(imageUrl);

    redInput.addEventListener('change', (e: Event) => {
      update({
        red: e.target.value,
        blue: blueInput.valueAsNumber,
        green: greenInput.valueAsNumber,
      });
    });

    greenInput.addEventListener('change', (e: Event) => {
      update({
        red: redInput.valueAsNumber,
        blue: blueInput.valueAsNumber,
        green: e.target.value,
      });
    });

    blueInput.addEventListener('change', (e: Event) => {
      update({
        red: redInput.valueAsNumber,
        blue: e.target.value,
        green: greenInput.valueAsNumber,
      });
    });
  }

  if (image) {
    image.setAttribute('src', imageUrl);
  }
});
