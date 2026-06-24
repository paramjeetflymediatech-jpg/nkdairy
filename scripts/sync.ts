import { syncDB } from '../src/models/index';
syncDB().then(() => process.exit(0));
