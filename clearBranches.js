#!/usr/bin/env node

const util = require('util');
const exec = util.promisify(require('child_process').exec);
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const removedBranches = [];

async function deleteBranches(branches) {
  if (!branches.length) {
    return removedBranches;
  }

  try {
    const { stdout } = await exec(`git branch -D ${branches[0]}`);

    removedBranches.push(stdout);

    return deleteBranches(branches.slice(1, branches.length));
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function lsWithGrep() {
  try {
    const args = process.argv.slice(2).join('');
    const { stdout: stdoutGb } = await exec('git branch');

    const ignore = args.match(/^--ignore=(((feat|fix|refactor|chore)\/[\w-\d]+)|,){1,}/g);

    const hasBranchesToIgnore = ignore && !!ignore.length;
    const ignoreBranches = hasBranchesToIgnore ? ignore[0].split('=')[1].replace(/,/g, '|') : '';

    const ignoreBranchesRegex = new RegExp(`(\\*| |master|develop|release|${ignoreBranches})`, 'g');

    const branches = stdoutGb
      .split(/\n/g)
      .map((branchName) => branchName.replace(ignoreBranchesRegex, ''))
      .filter((branchName) => branchName !== '');

    console.log('Branches to delete:');
    console.log(branches);

    rl.question('Are you sure you want to delete those branches? \n\n[yes/no]$ ', (res) => {
      if (/^(s|S|yes|Yes)$/g.test(res)) {
        deleteBranches(branches)
          .then((rmb) => {
            console.log('Branches remove successfully: \n');
            console.log(rmb.join(''));
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        console.log('Don\' Remove');
      }
      rl.close();
    });
  } catch (err) {
    console.error(err);
  }
}
lsWithGrep();