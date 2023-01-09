import * as child from 'child_process';
import prompts from 'prompts';

import { Options } from './@types/domains';

import { Branches } from './@types/domains';
import { ClearBranches } from './@types/entities';
import { deleteBranches } from './helpers';
import { messages } from './messages';

export function clearBranches(options: Options) {
  const considered = options?.consider || [];
  const ignored = options?.ignore || [];

  const git = child.spawn("git", ["branch"]);

  git.stdout.on('data', async (data: Buffer) => {
    const dataBranches = Branches.parse(data);
    const clearBranches = new ClearBranches(dataBranches);

    clearBranches.considered = considered;
    clearBranches.ignored = ignored;

    const validBranches = clearBranches.getOnlyValidBranches();

    if (validBranches.length === 0) {
      console.log(messages.ItsAllClear);
      git.kill();
      return;
    }

    validBranches.forEach((branchName) => {
      console.log(`  ${branchName}`);
    });

    const response = await prompts([{
      type: 'confirm',
      name: 'delete_all',
      message: messages.AreYouSureYouWantToDelete,
      initial: false,
    }]);

    if (response.delete_all) {
      const deletedBranches = await deleteBranches(validBranches);

      if (deletedBranches) {
        deletedBranches.forEach((branchName) => {
          console.log(messages.DeletedBranch(branchName));
        });
      }
    }
  });
}
