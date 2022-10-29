const db = require('../util/database');

module.exports = class Post {
  constructor(name, department, description, section, notes) {
    this.name = name;
    this.department = department;
    this.description = description;
    this.section = section;
    this.notes = notes;

  }
  static fetchAll() {
    return db.execute('SELECT * FROM students');
  }

  static save(post) {
    console.log('test')
    return db.execute(
      'INSERT INTO students (name, department, description, section, notes, user) VALUES (?, ?, ?, ?, ?, ?)',
      [post.name, post.department, post.description, post.section, post.notes, post.user]
    );
  }

  static delete(id) {
    return db.execute('DELETE FROM posts WHERE id = ?', [id]);
  }
};
