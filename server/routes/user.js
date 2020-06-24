const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../model/user');
const bodyParser = require('body-parser');
const app = express();

app.get('/user', function (req, res) {
    res.json('getUser')
})

app.post('/user', function (req, res) {
    let body = req.body


    let user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    user.save((err, userDB) => {
        if(err) {
            res.status(400).json({
                ok:false,
                err
            });
        }

        res.json({
            ok: true,
            user: userDB
        })
    });


    // if(body.name === undefined) {
    //     res.status(400).json({
    //         ok: false,
    //         msg: 'User name required!'
    //     })
    // } else {
    //     res.json({
    //         body
    //     })
    // }

})

app.put('/user/:id', function (req, res) {
    let id = req.params.id;
    res.json({
        id
    })
})

app.delete('/user', function (req, res) {
    res.json('deleteUser')
})

module.exports = app;