export class Branches {
  #branches: string[];

  constructor() {
    this.#branches = [];
  }

  get branches() {
    return this.#branches;
  }

  set branches(branches) {
    this.#branches = [...branches];
  }

  addBranch(branch: string) {
    this.#branches.push(branch);
  }

  removeBranch(branch: string | number) {
    if (typeof branch === 'string') {
      this.#branches = this.#branches.filter((b) => b === branch);
    }
    
    if (typeof branch === 'number') {
      this.#branches = this.#branches.filter((_, i) => i === branch);
    }
  }
}
  