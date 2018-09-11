import { reinsert } from './index';

describe('reinsert', () => {
  it('reinserts correctly', () => {
    const array = [1, 2, 3, 4, 5];
    expect(reinsert(array, 4, 3)).toEqual([1, 2, 3, 5, 4]);
    expect(reinsert(array, 3, 4)).toEqual([1, 2, 3, 5, 4]);
    expect(reinsert(array, 4, 0)).toEqual([5, 1, 2, 3, 4]);
    expect(reinsert(array, 4, 1)).toEqual([1, 5, 2, 3, 4]);
    expect(array).toEqual([1, 2, 3, 4, 5]); // Original untouched
  });
});
