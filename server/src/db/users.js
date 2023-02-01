const path = require('path');
const client = require(path.join(__dirname, 'client.js'));

const get_user_with_username = (username, callback) =>
    client.query('SELECT * FROM users WHERE username = $1', [username], (err,res) => {
        if (err) console.error(err);
        if (err || !res || !res.rows) callback(undefined);
        else callback(res.rows[0]);
    });


const get_user = (id, callback) =>
    client.query('SELECT * FROM users WHERE id = $1', [id], (err,res) => {
        if (err) console.error(err);
        if (err || !res || !res.rows) callback(undefined);
        else callback(res.rows[0]);
    });

const get_users = callback => 
    client.query('SELECT * FROM users', (err, res) => {
        if (err) console.error(err);
        if (err || !res || !res.rows) callback(undefined);
        else callback(res.rows[0]);
    });


module.exports = {
    get_user_with_username,

    get_user,
    get_users
}