/* istanbul ignore file */
const PostThread = require('../../../Domains/threads/entities/PostThread');
const AddedThread = require('../../../Domains/threads/entities/AddedThread');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
// const AuthenticationTokenManager = require('../../security/AuthenticationTokenManager');
// const AddThreadUseCase = require('../AddThreadUseCase');

describe('AddThreadUseCase', () => {
  it('should orchestrating the post thread action correctly', async () => {
    // // Arrange
    // const useCasePayload = {
    //   title: 'thread',
    //   body: 'isi thread',
    // }
    
    // const headerAuthorization = 'Bearer token'
    // const accessToken = 'token';

    // const mockAddedThread = new AddedThread({
    //   id: 'thread-123',
    //   title: 'thread',
    //   owner: 'user-123',
    // });

    // /** creating dependency of use case */
    // const mockAuthenticationTokenManager = new AuthenticationTokenManager();
    // const mockThreadRepository = new ThreadRepository();

    // /** mocking needed function */
    // mockAuthenticationTokenManager.getTokenFromHeader = jest.fn().mockImplementation(() => Promise.resolve(accessToken));
    // mockAuthenticationTokenManager.verifyAccessToken = jest.fn().mockImplementation(() => Promise.resolve());
    // mockAuthenticationTokenManager.decodePayload = jest.fn().mockImplementation(() => Promise.resolve({ username: 'dicoding', id: mockAddedThread.owner }));
    // mockThreadRepository.addThread = jest.fn().mockImplementation(() => Promise.resolve(mockAddedThread));

    // /** creating use case instance */
    // const addThreadUseCase = new AddThreadUseCase({
    //   threadRepository: mockThreadRepository,
    //   authenticationTokenManager: mockAuthenticationTokenManager,
    // });

    // // Action
    // const addedThread = await addThreadUseCase.execute(useCasePayload, headerAuthorization);

    // // Assert
    // expect(mockAuthenticationTokenManager.getTokenFromHeader).toBeCalledWith(headerAuthorization);
    // expect(mockAuthenticationTokenManager.verifyAccessToken()).resolves.toBeUndefined();
    // expect(mockAuthenticationTokenManager.decodePayload).toBeCalledWith(accessToken);

    // expect(mockThreadRepository.addThread).toBeCalledWith(new PostThread({
    //   title: useCasePayload.title,
    //   body: useCasePayload.body,
    //   owner: mockAddedThread.owner
    // }))

    // expect(addedThread).toStrictEqual(new AddedThread({
    //   id: mockAddedThread.id,
    //   title: mockAddedThread.title,
    //   owner: mockAddedThread.owner,
    // }));
  });
});
