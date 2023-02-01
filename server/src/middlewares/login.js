const path = require('path');
const db_users = require(path.join(__dirname, "/../db/users.js"));


const login = (req,res,next) => {
    if (!req.headers.username || !req.headers.password)
        res.status(400).json({"error" : "Bad request"});
    else
        db_users.get_user_with_username(req.headers.username, response => {
            if (!response) res.status(500).json({"error" : "Internale server error"});
            else
            {
                res.body = response;
                next();
            }
        });
}

module.exports = login;
