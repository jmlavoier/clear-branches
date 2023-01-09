export class Branches {
  #branches: string[];
  
  constructor(branches?: string[]) {
    this.#branches = branches || [];
  }

  get branches() {
    return this.#branches;
  }

  set branches(branches) {
    this.#branches = [...branches];
  }

  static parse(data: Buffer) {
    return new Branches(
      data.toString()
        .split(/\n/g)
        .map((branch) => branch.trim())
    )
  }
}

export interface ClearBranches {
  branches: Branches;
  ignoredBranches: Branches;
}

export type Previous = ClearBranches | undefined;

export type ExecFunction = (clearBranches: ClearBranches) => ClearBranches;

export type Options = {
  interactive?: boolean;
  consider?: Branches['branches'];
  ignore?: Branches['branches'];
  'ignore-pattern'?: string;
}