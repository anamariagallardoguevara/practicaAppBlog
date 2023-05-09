const getAll = () => {
    return db.query('SELECT * FROM autores');
}

const getAutorById = (id_autor) => {
    return db.query('SELECT * FROM autores where id_autor = ?', [id_autor]
    );
}

const create = ({ nombre, email, imagen, fecha_creacion }) => {
    return db.query('INSERT INTO autores (nombre, email, imagen, fecha_creacion) values (?, ?, ?, ?)',
    [nombre, email, imagen, fecha_creacion]
    );
}

const update = (id_autor, { nombre, email, imagen, fecha_creacion }) => {
    return db.query(
        'UPDATE autores SET nombre = ?, email = ?, imagen = ?, fecha_creacion = ? where id_autor = ?',
        [nombre, email, imagen, fecha_creacion, id_autor]
    );
}

const deleteById = (id_autor) => {
    return db.query('DELETE FROM autores where id_autor = ?',
    [id_autor]
    );
}
 

module.exports = {
    getAll, getAutorById, create, update, deleteById
}