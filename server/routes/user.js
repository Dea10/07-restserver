const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const User = require('../model/user');
const bodyParser = require('body-parser');
const app = express();

app.get('/user', function (req, res) {

    let from = req.query.from || 0;
    from = Number(from);

    let limit = req.query.limit || 5;
    limit = Number(limit);

    User.find({status: true}, 'name email role status google img')
        .skip(from)
        .limit(limit)
        .exec((err, users) => {
            if (err) {
                res.status(400).json({
                    ok: false,
                    err
                });
            }

            User.countDocuments({status: true}, (err, count) => {
                
                res.json({
                    ok: true,
                    users,
                    count
                })
            })

        })

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
        if (err) {
            res.status(400).json({
                ok: false,
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
    let body = _.pick(req.body, ['name', 'email', 'img', 'role', 'status']);

    User.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, userDB) => {

        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            user: userDB
        })
    });
})

app.delete('/user/:id', function (req, res) {
    
    let id = req.params.id;
    let body = {
        status: false
    }

    User.findByIdAndUpdate(id, body, {new: true}, (err, deletedUser) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            deletedUser
        })
    });

    // User.findByIdAndRemove(id, (err, deletedUser) => {

    //     if (err) {
    //         res.status(400).json({
    //             ok: false,
    //             err
    //         });
    //     }

    //     if( !deletedUser ) {
    //         res.status(400).json({
    //             ok: false,
    //             err: {
    //                 message: 'User not found'
    //             }
    //         });
    //     }

    //     res.json({
    //         ok:true,
    //         deletedUser
    //     })
    // })

})

module.exports = app;