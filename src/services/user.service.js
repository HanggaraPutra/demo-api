const dbpool = require('../config/database')

const register = async (body) => {
    const query = `INSERT INTO users (username, email, password) VALUES ('${body.username}', '${body.email}', '${body.password}')`

    return dbpool.execute(query);
}
const login = async (body) => {
    const query = `SELECT id, username, email FROM users WHERE email = '${body.email}' AND password = '${body.password}'`

    return dbpool.execute(query);
}

const update = async(id, body) => {
    const query = `UPDATE users SET username = '${body.username}', email = '${body.email}', password = '${body.password}'
    WHERE id = ${id}`

    return dbpool.execute(query);
}
const viewUser = async() => {
    const query = `SELECT id, username, email FROM users`

    return dbpool.execute(query)
}
const deleteUser = async(id) => {
    const query = `DELETE FROM users WHERE id = ${id}`

    return dbpool.execute(query);
}

const getUserByEmail = async (email) => {
    const query = `SELECT FROM users WHERE email = '${email}'`

    return dbpool.execute(query)
}
module.exports = { register, login, update, viewUser, deleteUser,getUserByEmail }