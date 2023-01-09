import { Command } from 'commander';

import { clearBranches } from './clear-branches';
import { messages } from './messages';
import { consider, ignore, ignorePattern, interactive } from './options';

const program = new Command();

const {
  IgnorePatternOptionHelp,
  ConsiderOptionHelp,
  IgnoreOptionHelp,
  HelpAfter,
  InteractiveOptionHelp
} = messages;

program
  .option('-c, --consider <values>', ConsiderOptionHelp, consider)
  .option('--ignore <values>', IgnoreOptionHelp, ignore)
  .option('--ignore-pattern <pattern>', IgnorePatternOptionHelp, ignorePattern)
  .option('-i, interactive', InteractiveOptionHelp, interactive)
  .action(clearBranches)
  .showHelpAfterError();

program.addHelpText('after', HelpAfter);

program.parse();
