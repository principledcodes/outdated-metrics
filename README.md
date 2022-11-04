# outdated-metrics

Metrics to help you quantify how outdated a package.json file is

## Development

### Committing changes

We are using conventional commits to maintain semantic versioning process.

The [commitlint](https://github.com/conventional-changelog/commitlint) is used
to verify that all commit messages satisfy conventions for semantic versioning.

The [husky](https://github.com/typicode/husky) pre-commit hook added to validate
commit message with the commitlint.

The [commitizen](https://www.npmjs.com/package/commitizen) is used to help
formatting commit messages. It is available via npm command `commit` -
`npm run commit`.

There are multiple ways to commit changes:

- Run `npm run commit` - the commit message wizard will help you to write a
  message that follows conventions.
- Run `git commit -m 'message'` - it will trigger husky pre-commit hook to
  validate commit message format. If message follows semantic versioning format
  the changes will be committed. In case when there are issues with the message
  format the error message will be presented and the changes won't be committed.
- Run `git commit` with `--no-verify` flag - it disables any commit messages
  validation.
