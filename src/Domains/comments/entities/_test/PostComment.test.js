const PostComment = require('../PostComment');

describe('a PostComment entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      content: 'isi komen',
      threadId: 'thread-123',
      userId: 'user-123',
    };

    // Action and Assert
    expect(() => new PostComment(payload)).toThrowError('POST_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      content: ['isi komen'],
      threadId: 123,
      owner: true,
    };

    // Action and Assert
    expect(() => new PostComment(payload).toThrowError('POST_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION'));
  });

  it('should create postComment object correctly', () => {
    // Arrange
    const payload = {
      content: 'isi komen',
      threadId: 'thread-123',
      owner: 'user-123',
    };

    // Action
    const { content, threadId, owner } = new PostComment(payload);

    // Assert
    expect(content).toEqual(payload.content);
    expect(threadId).toEqual(payload.threadId);
    expect(owner).toEqual(payload.owner);
  });
})