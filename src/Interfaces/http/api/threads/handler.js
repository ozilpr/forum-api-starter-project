const AddThreadUseCase = require("../../../../Applications/use_case/AddThreadUseCase");

class ThreadsHandler {
  constructor(container) {
    this._container = container;

    this.postThreadHandler = this.postThreadHandler.bind(this);
  }

  async postThreadHandler(request, h) {
    const headerAuthorization = request.headers.authorization;
    const addThreadUseCase = this._container.getInstance(AddThreadUseCase.name);
    const addedThread = await addThreadUseCase.execute(request.payload, headerAuthorization);

    const response = h.response({
      status: 'success',
      data: {
        addedThread,
      },
    });
    response.code(201);
    return response;
  }

  // async getThreadHandler(request, h) {
  //   const detailThread = await this._getThreadUseCase.execute(request.params);
  //   const response = h.response({
  //     status: 'success',
  //     data: {
  //       thread: detailThread,
  //     },
  //   });
  //   return response;
  // }
}

module.exports = ThreadsHandler;
