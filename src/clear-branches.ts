import * as child from 'child_process';
import prompts from 'prompts';

import { Options, Branches } from './@types/domains';

import { ClearBranches } from './@types/entities';
import { deleteBranches } from './helpers';
import { messages } from './messages';

export function clearBranches (options: Options): void {
  const git = child.spawn('git', ['branch']);

  git.stdout.on('data', (data: Buffer) => {
    const dataBranches = Branches.parse(data);
    const clearBranches = new ClearBranches(dataBranches);

    clearBranches.considered = options.consider;
    clearBranches.ignored = options.ignore;

    const validBranches = clearBranches.getOnlyValidBranches();

    if (validBranches.length === 0) {
      console.log(messages.ItsAllClear);
      git.kill();
      return;
    }

    validBranches.forEach((branchName) => {
      console.log(`  ${branchName}`);
    });

    prompts([{
      type: 'confirm',
      name: 'delete_all',
      message: messages.AreYouSureYouWantToDelete,
      initial: false
    }]).then(async (response) => {
      if (response.delete_all === true) {
        const deletedBranches = await deleteBranches(validBranches);

        if (deletedBranches != null) {
          deletedBranches.forEach((branchName) => {
            console.log(messages.DeletedBranch(branchName));
          });
        }
      }
    }).catch((e) => {
      console.error(e);
    });
  });
}
