import { Branches } from './domains';

describe('Branches', () => {
  it('should instantiate with a blank array', () => {
    const branches = new Branches();
    expect(branches.branches).toEqual([]);
  });

  it('should set branches array', () => {
    const branches = new Branches();
    branches.branches = ['feat/one', 'feat/two', 'feat/three'];
    expect(branches.branches).toEqual(['feat/one', 'feat/two', 'feat/three']);
  });

  it('should should parse Buffer to Branches array', () => {
    const buffer = Buffer.from(String(`chore/lib
    feat/great-improvement
    feat/new-architecture
    `));

    const branches = Branches.parse(buffer);

    expect(branches).toBeInstanceOf(Branches);
    expect(branches.branches).toEqual([
      'chore/lib',
      'feat/great-improvement',
      'feat/new-architecture'
    ]);
  });
})
