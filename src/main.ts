import { Command } from 'commander';

import { clearBranches } from './clear-branches';
import { messages } from './messages';
import { consider, ignore, ignorePattern, interactive } from './options';

const program = new Command();

program
  .option('-c, --consider <values>', messages.ConsiderOptionHelp, consider)
  .option('--ignore <values>', messages.IgnoreOptionHelp, ignore)
  .option('--ignore-pattern <pattern>', messages.IgnorePatternOptionHelp, ignorePattern)
  .option('-i, interactive', messages.InteractiveOptionHelp, interactive)
  .action(clearBranches)
  .showHelpAfterError();

program.addHelpText('after', messages.HelpAfter);

program.parse();
