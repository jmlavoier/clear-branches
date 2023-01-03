import { Branches } from './Branches';

describe('Branches', () => {
  it('should instantiate with a blank array', () => {
    const branches = new Branches();
    expect(branches.branches).toEqual([]);
  });

  it('should attribute branches array', () => {
    const branches = new Branches();
    branches.branches = ['feat/one', 'feat/two', 'feat/three'];
    expect(branches.branches).toEqual(['feat/one', 'feat/two', 'feat/three']);
  });

  it('should add a new branch on the last position', () => {
    const branches = new Branches();
    branches.addBranch('feat/one');
    branches.addBranch('feat/two');
    expect(branches.branches.reverse()[0]).toEqual('feat/two');
  });
  
  it('should remove a branch by name', () => {
    const branches = new Branches();
    branches.branches = ['feat/one', 'feat/two', 'feat/three'];
    expect(branches.branches).toEqual(['feat/one', 'feat/two', 'feat/three']);
    branches.removeBranch('feat/two');
    expect(branches.branches).not.toContain('feat/two');
  });

  it('should remove a branch by index', () => {
    const branches = new Branches();
    branches.branches = ['feat/one', 'feat/two', 'feat/three'];
    expect(branches.branches).toEqual(['feat/one', 'feat/two', 'feat/three']);
    branches.removeBranch(1);
    expect(branches.branches).not.toContain('feat/two');
  });
})