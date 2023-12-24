const pool = require('../../database/postgres/pool');
const ServerTestHelper = require('../../../../tests/ServerTestHelper');
const container = require('../../container');
const createServer = require('../createServer');
const AuthenticationsTableTestHelper = require('../../../../tests/AuthenticationsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');


describe('/threads endpoint', () => {
  afterAll(async () => {
    await pool.end();
  });

  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
    await AuthenticationsTableTestHelper.cleanTable();
    await ThreadsTableTestHelper.cleanTable();
  });

  describe('when POST /threads', () => {
    it('should response 201 and persisted thread', async () => {
      // Arrange
      const payload = {
        title: 'thread',
        body: 'isi thread',
      }
      
      // eslint-disable-next-line no-undef
      const server = await createServer(container);
      const { accessToken } = await ServerTestHelper.getAccessTokenAndUserId({ server });
      
      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads',
        payload: payload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.addedThread).toBeDefined();
    });

    it('should response 400 when request payload not contain needed property', async () => {
      // Arrange
      const payload = {
        title: 'thread',
      }
      
      // eslint-disable-next-line no-undef
      const server = await createServer(container);
      const { accessToken } = await ServerTestHelper.getAccessTokenAndUserId({ server });
      
      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads',
        payload: payload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('tidak dapat membuat thread baru karena property yang dibutuhkan tidak ada');
    });

    it('should response 400 when request payload not meet data type specification', async () => {
      // Arrange
      const payload = {
        title: 'thread',
        body: ['isi thread'],
      }
      
      // eslint-disable-next-line no-undef
      const server = await createServer(container);
      const { accessToken } = await ServerTestHelper.getAccessTokenAndUserId({ server });
      
      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads',
        payload: payload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('tidak dapat membuat thread baru karena tipe data tidak sesuai');
    });

    it('should response 404 when thread not found', async () => {
      // // Arrange
      // const server = await createServer(container);
      
      // // Action
      // const response = await server.inject({
      //   method: 'GET',
      //   url: '/threads/123',
      // });

      // // Assert
      // const responseJson = JSON.parse(response.payload);
      // expect(response.statusCode).toEqual(404);
      // expect(responseJson.status).toEqual('fail');
      // expect(responseJson.message).toEqual('thread tidak ditemukan');
    });
  });
});
