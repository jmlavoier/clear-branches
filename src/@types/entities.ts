import { Branches, BranchesList } from './domains';

export class ClearBranches {
  #considered: Branches;
  #ignored: Branches;
  #all: Branches;

  constructor (branches?: Branches) {
    this.#considered = new Branches();
    this.#ignored = new Branches();
    this.#all = new Branches();

    this.#ignored.branches = ['main', 'master', 'release', 'develop'];
    this.#all.branches =
      ((branches?.branches) != null)
        ? [...branches?.branches]
        : [];
  }

  get considered (): BranchesList {
    return this.#considered.branches;
  }

  set considered (branches: BranchesList | undefined) {
    if (branches != null) {
      this.#considered.branches = [...branches];
    }
  }

  get ignored (): BranchesList {
    return this.#ignored.branches.filter(
      (branch) => !this.#considered.branches.includes(branch)
    );
  }

  set ignored (branches: BranchesList | undefined) {
    if (branches != null) {
      this.#ignored.branches = [...this.#ignored.branches, ...branches];
    }
  }

  get all (): BranchesList {
    return this.#all.branches;
  }

  set all (branches: BranchesList) {
    this.#all.branches = [...branches];
  }

  #isNotCurrent (branch: string): boolean {
    return !/\* \w+/g.test(branch);
  }

  #isNotEmpty (branch: string): boolean {
    return branch !== '';
  }

  getOnlyValidBranches (): ClearBranches {
    return new ClearBranches(
      new Branches(this.#all.branches.filter((branch) =>
        this.#isNotCurrent(branch) &&
        this.#isNotEmpty(branch) &&
        !this.ignored.includes(branch)
      ))
    );
  }

  getWithIgnoredPattern (pattern: RegExp): ClearBranches {
    return new ClearBranches(
      new Branches(this.#all.branches.filter((branch) => !pattern.test(branch)))
    )
  }
}
