import * as child from 'child_process';
import prompts from 'prompts';

import { Options, Branches, BranchesList } from './@types/domains';

import { ClearBranches } from './@types/entities';
import { deleteBranches } from './helpers';
import { messages } from './messages';

export function clearBranches (options: Options): void {
  const git = child.spawn('git', ['branch']);

  const {
    force,
    ignore,
    ignorePattern,
    interactive
  } = options;

  git.stdout.on('data', (data: Buffer) => {
    const dataBranches = Branches.parse(data);
    const clearBranches = new ClearBranches(dataBranches);

    clearBranches.considered = force;
    clearBranches.ignored = ignore;
    const isInteractive = interactive != null;

    const action = async (): Promise<void> => {
      const validBranches = clearBranches
        .getOnlyValidBranches(ignorePattern)
        .all;

      const selectedBranches = await prompts(isInteractive
        ? [{
            type: 'multiselect',
            name: 'value',
            message: 'Choose the branches you want to delete:',
            choices: validBranches.map((branch) => ({
              title: branch,
              value: branch
            }))
          }]
        : []);

      if (validBranches.length === 0) {
        console.log(messages.ItsAllClear);
        git.kill();
        return;
      }

      if (validBranches.length > 0 && selectedBranches.value.length === 0) {
        console.log(messages.NoBranchesSelected);
        git.kill();
        return;
      }

      const electedBranches: BranchesList = isInteractive
        ? selectedBranches.value
        : validBranches;

      electedBranches.forEach((branchName) => {
        console.log(`  ${branchName}`);
      });

      const response = await prompts([{
        type: 'confirm',
        name: 'delete_all',
        message: messages.AreYouSureYouWantToDelete,
        initial: false
      }]);

      if (response.delete_all === true) {
        const deletedBranches = await deleteBranches(electedBranches);

        if (deletedBranches != null) {
          deletedBranches.forEach((branchName) => {
            console.log(messages.DeletedBranch(branchName));
          });
        }
      }
    }

    void action();
  });
};
