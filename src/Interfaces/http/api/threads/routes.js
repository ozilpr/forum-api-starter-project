const routes = (handler) => ([
  {
    method: 'POST',
    path: '/threads',
    handler: handler.postThreadHandler,
  },
  // {
  //   method: 'GET',
  //   path: '/threads/{threadId}',
  //   hander: handler.getThreadHandler,
  // }
]);

module.exports = routes;
