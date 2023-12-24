const AddedComment = require('../../../Domains/comments/entities/AddedComment');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const AuthenticationTokenManager = require('../../security/AuthenticationTokenManager');
const AddCommentUseCase = require('../AddCommentUseCase');
const CommentRepository = require('../../../Domains/comments/CommentRepository');
const PostComment = require('../../../Domains/comments/entities/PostComment');

describe('AddCommentUseCase', () => {
  it('should orchestrating the post comment action correctly', async () => {
    // Arrange
    const useCasePayload = {
      content: 'isi komen',
    }

    const useCaseParams = {
      threadId: 'thread-123',
    }

    const useCaseHeaders = {
      Authorization: 'Bearer token',
    }

    const userIdFromAccessToken = 'user-123';
    const accessToken = 'token';

    const mockAddedComment = new AddedComment({
      id: 'comment-123',
      content: useCasePayload.content,
      owner: userIdFromAccessToken,
    });

    /** creating dependency of use case */
    const mockAuthenticationTokenManager = new AuthenticationTokenManager();
    const mockThreadRepository = new ThreadRepository();
    const mockCommentRepository = new CommentRepository();

    /** mocking needed function */
    mockThreadRepository.findThreadById = jest.fn().mockImplementation(() => Promise.resolve());
    mockAuthenticationTokenManager.getTokenFromHeader = jest.fn().mockImplementation(() => Promise.resolve(accessToken));
    mockAuthenticationTokenManager.verifyAccessToken = jest.fn().mockImplementation(() => Promise.resolve());
    mockAuthenticationTokenManager.decodePayload = jest.fn().mockImplementation(() => Promise.resolve({ id: userIdFromAccessToken }));
    mockCommentRepository.addComment = jest.fn().mockImplementation(() => Promise.resolve(mockAddedComment));

    /** creating use case instance */
    const addCommentUseCase = new AddCommentUseCase({
      threadRepository: mockThreadRepository,
      commentRepository: mockCommentRepository,
      authenticationTokenManager: mockAuthenticationTokenManager,
    });

    // Action
    const addedComment = await addCommentUseCase.execute(useCasePayload, useCaseParams, useCaseHeaders);

    // Assert
    expect(mockAuthenticationTokenManager.getTokenFromHeader).toBeCalledWith(useCaseHeaders.Authorization);
    expect(mockAuthenticationTokenManager.verifyAccessToken).toBeCalledWith(accessToken);
    expect(mockAuthenticationTokenManager.decodePayload).toBeCalledWith(accessToken);
    expect(mockThreadRepository.findThreadById).toBeCalledWith(useCaseParams.threadId);
    expect(mockCommentRepository.addComment).toBeCalledWith(new PostComment({
      content: useCasePayload.content,
      threadId: useCaseParams.threadId,
      owner: userIdFromAccessToken,
    }));
    expect(addedComment).toStrictEqual(mockAddedComment);
  });
});
