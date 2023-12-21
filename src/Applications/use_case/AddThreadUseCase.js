const PostThread = require('../../Domains/threads/entities/PostThread');

class AddThreadUseCase {
  constructor({ threadRepository, authenticationTokenManager }) {
    this._threadRepository = threadRepository;
    this._authenticationTokenManager = authenticationTokenManager;
  }

  async execute(useCasePayload, headerAuthorization) {
    const accessToken = await this._authenticationTokenManager.getTokenFromHeader(headerAuthorization);
    await this._authenticationTokenManager.verifyAccessToken(accessToken);
    const { id: owner } = await this._authenticationTokenManager.decodePayload(accessToken);
    const postThread = new PostThread({ ...useCasePayload, owner });
    return this._threadRepository.addThread(postThread);
  }
}

module.exports = AddThreadUseCase;