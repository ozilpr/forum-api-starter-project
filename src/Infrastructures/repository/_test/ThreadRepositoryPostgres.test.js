const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const PostThread = require('../../../Domains/threads/entities/PostThread');
const AddedThread = require('../../../Domains/threads/entities/AddedThread');
const pool = require('../../database/postgres/pool');
const ThreadRepositoryPostgres = require('../ThreadRepositoryPostgres');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const UserRepository = require('../../../Domains/users/UserRepository');
const UserRepositoryPostgres = require('../UserRepositoryPostgres');

describe('ThreadRepositoryPostgres', () => {
  afterEach(async () => {
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('addThread function', () => {
    it('should create a thread and return added thread correctly', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({
        id: 'user-123',
        username: 'dicoding',
        password: 'secretpassword',
        fullname: 'Dicoding Indonesia',
      })

      const postThread = new PostThread({ 
        title: 'thread', 
        body: 'isi thread', 
        owner: 'user-123',
      })

      const fakeIdGenerator = () => '123';
      const fakeDateGenerator = () => new Date('2023').toISOString();

      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, fakeIdGenerator, fakeDateGenerator);

      // Action
      const addedThread = await threadRepositoryPostgres.addThread(postThread);

      // Assert
      const threads = await ThreadsTableTestHelper.findThreadById(addedThread.id);
      expect(threads).toHaveLength(1);
    });
  });

  describe('findThreadById function', () => {
    it('should throw NotFoundError when thread not found', async () => {
      // Arrange
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});
      
      // Action & Assert
      await expect(threadRepositoryPostgres.findThreadById('thread-123')).rejects.toThrowError(NotFoundError);
    });

    it('should return added thread correctly', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ 
        id: 'user-123',
        username: 'dicoding',
      });
      
      const postThread = {
        id: 'thread-123',
        title: 'thread', 
        body: 'isi thread', 
        owner: 'user-123',
        date: '2023',
      };

      const addedThread = {
        id: 'thread-123',
        title: 'thread',
        body: 'isi thread',
        username: 'dicoding',
        date: '2023',
      }

      await ThreadsTableTestHelper.addThread(postThread);
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(pool, {});

      // Action
      const foundThread = await threadRepositoryPostgres.findThreadById('thread-123');

      // Assert
      expect(foundThread).toEqual(addedThread);
    });
  });
});

