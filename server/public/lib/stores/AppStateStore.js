var {AppStateStore} = require('cork-app-state');

class AppStateStoreImpl extends AppStateStore {}

module.exports = new AppStateStoreImpl();