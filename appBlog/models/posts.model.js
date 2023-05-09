const getAll = () => {
    return db.query('SELECT * FROM posts');
}

const getPostByAutor = (pk_id_autor) => {
    return db.query(
        'SELECT * FROM posts where pk_id_autor = ?',
        [pk_id_autor]
    );
}

const getPostById = (id_post) => {
    return db.query('SELECT * FROM posts where id_post = ?', [id_post])
}

const create = ({ titulo, descripcion, fecha_creacion, categoria, pk_id_autor }) => {
    return db.query('INSERT INTO posts (titulo, descripcion, fecha_creacion, categoria, pk_id_autor) values (?, ?, ?, ?, ?)',
    [titulo, descripcion, fecha_creacion, categoria, pk_id_autor]
    );
}

const update = (id_post, { titulo, descripcion, fecha_creacion, categoria, pk_id_autor }) => {
    return db.query(
        'UPDATE posts SET titulo = ?, descripcion = ?, fecha_creacion = ?, categoria = ?, pk_id_autor = ? where id_post = ?',
        [titulo, descripcion, fecha_creacion, categoria, pk_id_autor, id_post]
    );
}

const deleteById = (id_post) => {
    return db.query('DELETE FROM posts where id_post = ?',
    [id_post]
    );
}

module.exports = {
    getAll, getPostByAutor, getPostById, create, update, deleteById
}