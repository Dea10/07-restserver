require('./config/config.js')

const express = require('express')
const app = express()
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/user', function (req, res) {
    res.json('getUser')
})

app.post('/user', function (req, res) {
    let user = req.body

    if(user.name === undefined) {
        res.status(400).json({
            ok: false,
            msg: 'User name required!'
        })
    } else {
        res.json({
            user
        })
    }

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

app.listen(process.env.PORT, () => {
    console.log(`Listening on port: ${process.env.PORT}`)
})