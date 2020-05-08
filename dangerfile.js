import { danger, warn, message } from 'danger';

const packageJSON = danger.git.fileMatch('package.json');
const lockfile = danger.git.fileMatch('yarn.lock');

if (packageJSON.modified && !lockfile.modified) {
  warn('You might have forgotten to run `yarn`.');
}

message('dangerci message');
