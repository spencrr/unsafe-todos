const url = require('url');
const express = require('express');
const app = express();

const sha256 = require('js-sha256').sha256;

const cookieSession = require('cookie-session');

app.use(express.static('static'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieSession({
    name: 'session',
    keys: ['key']
}));



const sqlite3 = require('sqlite3');

let db = new sqlite3.Database('./data/site.db');

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening on ${port}`);
});

app.post('/login', (req, res) => {
    let {
        username,
        password
    } = getCredentialsFromRequest(req.body);
    searchForUser(username, (err, row) => {
        if (err) {
            console.log(err);
        } else {
            if (!row) {
                registerUser(username, password, (err) => {
                    if (err) {
                        console.log(err);
                    }
                });
                res.redirect('/register');
            } else {
                const redirectURL = redirectWithUsername(username);
                if (password == row.password) {
                    res.redirect(redirectURL('/success'));
                } else {
                    res.redirect(redirectURL('/fail'));
                }
            }

        }
    });
});

const getCredentialsFromRequest = (req) => {
    let username = req.body.username;
    let password = sha256(req.body.password);
    return {
        username,
        password
    };
};

const searchForUser = (username, callback) => {
    db.get(`SELECT * FROM User WHERE username='${username}'`, callback);
};

const registerUser = (username, password, callback) => {
    db.run(`INSERT INTO User VALUES ('${username}', '${password}')`, callback);
};

const redirectWithUsername = (username) => {
    return (base) => {
        return url.format({
            pathname: base,
            query: {
                username
            }
        });
    };
};