import { DeepCopyPipe } from './deep.copy.pipe';

describe('DeepCopyPipe', () => {
  it('create an instance', () => {
    const pipe = new DeepCopyPipe();
    expect(pipe).toBeTruthy();
  });
});
