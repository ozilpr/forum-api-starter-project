const routes = (handler) => ([
  {
    method: 'POST',
    path: '/threads/{threadId}/comments/{commentId}',
    handler: handler.postCommentHandler,
  },
  // {
  //   method: 'GET',
  //   path: '/threads/{threadId}',
  //   hander: handler.getThreadHandler,
  // }
]);

module.exports = routes;
