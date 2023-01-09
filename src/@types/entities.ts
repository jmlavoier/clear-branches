import { Branches} from './domains';

export class ClearBranches {
  #considered: Branches;
  #ignored: Branches;
  #all: Branches;

  constructor(branches?: Branches) {
    this.#considered = new Branches();
    this.#ignored = new Branches();
    this.#all = new Branches();

    this.#ignored.branches = ['main', 'master', 'release', 'develop'];
    this.#all.branches = branches?.branches || [];
  }

  get considered() {
    return this.#considered.branches;
  }

  set considered(branches: string[]) {
    this.#considered.branches = [...branches];
  }

  get ignored() {
    return this.#ignored.branches.filter((branch) => !this.#considered.branches.includes(branch));
  }

  set ignored(branches: string[]) {
    this.#ignored.branches = [...this.#ignored.branches, ...branches];
  }

  get all() {
    return this.#all.branches;
  }

  set all(branches: string[]) {
    this.#all.branches = [...branches];
  }

  #isNotCurrent(branch: string) {
    return !/\* \w+/g.test(branch);
  }

  #isNotEmpty(branch: string) {
    return branch !== '';
  }

  getOnlyValidBranches() {
    return this.#all.branches.filter((branch) => 
      this.#isNotCurrent(branch)
      && this.#isNotEmpty(branch)
      && !this.ignored.includes(branch)
    );
  }
}