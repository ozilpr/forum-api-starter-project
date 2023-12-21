
const NotFoundError = require("../../Commons/exceptions/NotFoundError");
const ThreadRepository = require("../../Domains/threads/ThreadRepository");
const AddedThread = require("../../Domains/threads/entities/AddedThread");

class ThreadRepositoryPostGres extends ThreadRepository {
  constructor(pool, idGenerator, dateGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
    this._dateGenerator = dateGenerator;
  }

  async addThread(postThread) {
    const { title, body, owner } = postThread;
    const id = `thread-${this._idGenerator()}`;
    const date = this._dateGenerator();

    const query = {
      text: 'INSERT INTO threads (id, title, body, owner, date) VALUES ($1, $2, $3, $4, $5) RETURNING id, title, owner',
      values: [id, title, body, owner, date],
    }

    const result = await this._pool.query(query);

    return new AddedThread({ ...result.rows[0] });
  }

  async findThreadById(id) {
    const query = {
      text: `SELECT threads.id, threads.title, threads.body, threads.date, users.username
             FROM threads
             INNER JOIN users ON threads.owner = users.id
             WHERE threads.id = $1`,
      values: [id],
    }

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('thread tidak ditemukan');
    }
    return result.rows[0];
  }
}

module.exports = ThreadRepositoryPostGres;