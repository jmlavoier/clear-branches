import * as child from 'child_process';

const removedBranches: string[] = [];

export async function deleteBranches(branches: string[]): Promise<string[] | null> {
  if (!branches.length) {
    return removedBranches;
  }

  try {
    const [first, ...other] = branches;
    child.spawn("git", ["branch", "-D", first]);

    removedBranches.push(first);
    return deleteBranches([...other]);
  } catch (err) {
    console.error(err);
    return null;
  }
}