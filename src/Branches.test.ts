import assert from 'node:assert';
import { describe, it } from 'node:test';

import { Branches } from './Branches';

describe('Branches', () => {
  it('should instantiate with a blank array', () => {
    const branches = new Branches();

    assert.deepEqual(branches.branches, []);
  });
  it('should add a new branch on the last position');
  it('should remove a branch by name');
  it('should remove a branch by index');
})