export type BranchesList = string[]

export class Branches {
  #branches: BranchesList;

  constructor (branches?: string[]) {
    this.#branches = (branches != null) ? [...branches] : [];
  }

  get branches (): string[] {
    return this.#branches;
  }

  set branches (branches) {
    this.#branches = [...branches];
  }

  static parse (data: Buffer): Branches {
    return new Branches(
      data.toString()
        .split(/\n/g)
        .map((branch) => branch.trim())
        .filter((branch) => branch !== '')
    )
  }
}

export interface ClearBranches {
  branches: Branches
  ignoredBranches: Branches
}

export type Previous = ClearBranches | undefined;

export type ExecFunction = (clearBranches: ClearBranches) => ClearBranches;

export interface Options {
  interactive?: boolean
  consider?: BranchesList
  ignore?: BranchesList
  ignorePattern?: RegExp
}
