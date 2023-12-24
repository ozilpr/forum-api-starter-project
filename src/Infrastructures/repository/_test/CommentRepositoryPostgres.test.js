const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const CommentsTableTestHelper = require('../../../../tests/CommentsTableTestHelper');
const PostComment = require('../../../Domains/comments/entities/PostComment');
const pool = require('../../database/postgres/pool');
const CommentRepositoryPostgres = require('../CommentRepositoryPostgres');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const AddedComment = require('../../../Domains/comments/entities/AddedComment');

describe('CommentRepositoryPostgres', () => {
  beforeAll(async () => {
    const userId = 'user-123';
    const threadId = 'thread-123';
    await UsersTableTestHelper.addUser({ id: userId, username: 'dicoding' });
    await ThreadsTableTestHelper.addThread({ id: threadId, owner: userId });
  })

  afterEach(async () => {
    await CommentsTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await CommentsTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
    await pool.end();
  });

  describe('addComment function', () => {
    it('should create a thread and return added thread correctly', async () => {
      // Arrange
      const postComment = new PostComment({ 
        content: 'isi komen', 
        threadId: 'thread-123', 
        owner: 'user-123',
      })

      const fakeIdGenerator = () => '123';
      const fakeDateGenerator = () => new Date('2023').toISOString();

      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, fakeIdGenerator, fakeDateGenerator);

      // Action
      const addedComment = await commentRepositoryPostgres.addComment(postComment);
      const comments = await CommentsTableTestHelper.findCommentById(addedComment.id);

      // Assert
      expect(addedComment).toStrictEqual(new AddedComment({
        id: `comment-${fakeIdGenerator()}`,
        content: postComment.content,
        owner: postComment.owner,
      }));
      expect(comments).toBeDefined();
    });
  });

  describe('deleteCommentById function', () => {
    it('should soft delete a comment by id correctly', async () => {
      // Arrange
      const addedComment = {
        id: 'comment-123',
        threadId: 'thread-123',
      };

      await CommentsTableTestHelper.addComment({ id: addedComment.id, threadId: addedComment.threadId });
      const commentRepositoryPostgres = new CommentRepositoryPostgres(pool, {}, {});

      // Action
      await commentRepositoryPostgres.deleteCommentById(addedComment.id);
      const comment = await CommentsTableTestHelper.findCommentById('comment-123');

      // Assert
      expect(comment.is_deleted).toEqual(true);
    });
  });
});

