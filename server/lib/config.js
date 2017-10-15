const env = process.env;

module.exports = {

  server : {
    port : env.SERVER_PORT || '3000',
    url : env.SERVER_URL || 'http://localhost:3000',
    label : env.SERVER_LABEL || 'EcoSML', // used for auth redirect
    assets : env.SERVER_ASSET_DIR || 'public',

    jwt : {
      secret : env.JWT_SECRET || 'not set'
    },

    auth : {
      redirect : env.AUTH_REDIRECT || 'http://localhost:3000/user/remotelogin'
    },

    session : {
      maxAge : (86400 * 365), // ms - year
      secret : env.SESSION_SECRET || 'not set'
    }

  }

}