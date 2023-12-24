
const NotFoundError = require("../../Commons/exceptions/NotFoundError");
const CommentRepository = require("../../Domains/comments/CommentRepository");
const AddedComment = require("../../Domains/comments/entities/AddedComment");

class CommentRepositoryPostgres extends CommentRepository {
  constructor(pool, idGenerator, dateGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
    this._dateGenerator = dateGenerator;
  }

  async addComment(postComment) {
    const { threadId, content, owner } = postComment;
    const id = `comment-${this._idGenerator()}`;
    const date = this._dateGenerator();

    const query = {
      text: 'INSERT INTO comments (id, thread_id, content, owner, date) VALUES ($1, $2, $3, $4, $5) RETURNING id, content, owner',
      values: [id, threadId, content, owner, date],
    }

    const result = await this._pool.query(query);

    return new AddedComment({ ...result.rows[0] });
  }

  async deleteCommentById(id) {
    const query = {
      text: `UPDATE comments SET is_deleted = TRUE
             WHERE id = $1
             RETURNING id`,
      values: [id],
    }

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('komen tidak dapat menghapus karena komen tidak ditemukan');
    }
  }
}

module.exports = CommentRepositoryPostgres;