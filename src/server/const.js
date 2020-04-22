const BackendApiRoutes = {
  CONF: '/conf',
  BUILD_LIST: '/build/list',
  BUILD_DETAILS: '/build/details',
  BUILD_LOG: '/build/log',
  BUILD_REQUEST: '/build/request',
  BUILD_START: '/build/start',
  BUILD_FINISH: '/build/finish',
  BUILD_CANCEL: '/build/cancel',
};

const ApiRoutes = {
  SETTINGS: '/settings',
  BUILD_LIST: '/builds',
  BUILD_DETAILS: '/builds/:buildId',
  BUILD_LOG: '/builds/:buildId/logs',
  // BUILD_REQUEST: '/builds/:commitHash',
  BUILD_REQUEST: '/builds',
}

const ResponseStatus = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  INTERNAL_SERVER_ERROR: 500,
}

module.exports = {
  BackendApiRoutes,
  ApiRoutes,
  ResponseStatus
};
