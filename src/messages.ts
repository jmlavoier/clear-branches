/* eslint-disable max-len */

export const messages = {
  ItsAllClear: '  It is all clear! There is no considered branches to delete.',
  AreYouSureYouWantToDelete: 'Are you sure you want to delete listed branches above?',
  ForceOptionHelp: 'force ignored branches by default to be considered to clear',
  IgnoreOptionHelp: 'ignore all branches separated by comma',
  IgnorePatternOptionHelp: 'ignore all branches that matches the regex pattern',
  InteractiveOptionHelp: 'select the branches you want to delete',
  NoBranchesSelected: 'No branches selected to delete',
  HelpAfter: `
  By default, clear-branches will ignore these branches.

  - main
  - master
  - release
  - develop

  Using --force <branch>[,<branch>], you will be able not to ignore any of these branches.
  I.e.: clear-branches --force main`,
  DeletedBranch: (branchName: string) => `  Deleted ${branchName}`
};
