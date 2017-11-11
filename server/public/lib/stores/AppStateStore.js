var {AppStateStore} = require('@ucd-lib/cork-app-state');

class AppStateStoreImpl extends AppStateStore {}

module.exports = new AppStateStoreImpl();