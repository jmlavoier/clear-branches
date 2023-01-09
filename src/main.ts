import { Command } from 'commander';

import { clearBranches } from './clear-branches';
import { consider, ignore, ignorePattern, interactive } from './options';

const program = new Command();

program
  .option('-c, --consider <values>', 'force ignored branches by default to be considered to clear', consider)
  .option('--ignore <values>', 'ignore all branches separated by comma', ignore)
  .option('--ignore-pattern <pattern>', 'ignore all branches that matches the regex pattern', ignorePattern)
  .option('-i, interactive', 'select the branches you want to delete', interactive)
  .action(clearBranches)
  .showHelpAfterError();

program.addHelpText('after', `
  By default clear-branches will ignore these branches
  
  - main
  - master
  - release
  - develop

  Using --consider <branch>[,<branch>] you can force to consider any of these branches. 
  I.e: clear-branches --consider main
`);

program.parse();
