const ServerTestHelper = {
  async getAccessTokenAndUserId({ server }) {
    const userPayload = {
      username: 'dicoding',
      password: 'secretpassword',
      fullname: 'Dicoding Indonesia',
    };

    const addedUser = await server.inject({
      method: 'POST',
      url: '/users',
      payload: userPayload,
    });

    const { id } = (JSON.parse(addedUser.payload)).data.addedUser;

    const authResponse = await server.inject({
      method: 'POST',
      url: '/authentications',
      payload: {
        username: userPayload.username,
        password: userPayload.password,
      },
    });

    const { accessToken } = (JSON.parse(authResponse.payload)).data;
    return { id, accessToken };
  }
}

module.exports = ServerTestHelper;