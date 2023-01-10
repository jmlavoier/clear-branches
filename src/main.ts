import { Command } from 'commander';

import { clearBranches } from './clear-branches';
import { messages } from './messages';
import { force, ignore, ignorePattern, interactive } from './options';

const program = new Command();

const {
  IgnorePatternOptionHelp,
  ForceOptionHelp,
  IgnoreOptionHelp,
  HelpAfter,
  InteractiveOptionHelp
} = messages;

program
  .option('-f, --force <values>', ForceOptionHelp, force)
  .option('--ignore <values>', IgnoreOptionHelp, ignore)
  .option('--ignore-pattern <pattern>', IgnorePatternOptionHelp, ignorePattern)
  .option('-i, interactive', InteractiveOptionHelp, interactive)
  .action(clearBranches)
  .showHelpAfterError();

program.addHelpText('after', HelpAfter);

program.parse();
