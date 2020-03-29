const BackendApiRoutes = {
  CONF: '/conf',
  BUILD_LIST: '/build/list',
  BUILD_DETAILS: '/build/details',
  BUILD_REQUEST: '/build/request',
  BUILD_START: '/build/start',
  BUILD_FINISH: '/build/finish',
  BUILD_CANCEL: '/build/cancel'
};

const ApiRoutes = {
  SETTINGS: '/settings',
  BUILD_LIST: '/builds',
  BUILD_DETAILS: '/builds/:buildId',
  BUILD_LOG: '/builds/:buildId/logs',
  BUILD_REQUEST: '/builds/:commitHash'
}

module.exports = {
  BackendApiRoutes,
  ApiRoutes
};
