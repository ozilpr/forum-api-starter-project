const PostComment = require('../../Domains/comments/entities/PostComment');

class AddCommentUseCase {
  constructor({ threadRepository, commentRepository, authenticationTokenManager }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
    this._authenticationTokenManager = authenticationTokenManager;
  }

  async execute(useCasePayload, useCaseParams, useCaseHeaders) {
    const accessToken = await this._authenticationTokenManager.getTokenFromHeader(useCaseHeaders.Authorization);
    await this._authenticationTokenManager.verifyAccessToken(accessToken);
    const { id: owner } = await this._authenticationTokenManager.decodePayload(accessToken);
    await this._threadRepository.findThreadById(useCaseParams.threadId);
    const postComment = new PostComment({ ...useCasePayload, owner, threadId: useCaseParams.threadId });
    return this._commentRepository.addComment(postComment);
  }
}

module.exports = AddCommentUseCase;