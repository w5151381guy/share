const express = require('express')
const bodyParser = require('body-parser')
const co = require('co')
const database = require('./database')

const app = express()

app.use(bodyParser.json())

app.get('/api/item/:itemid', (req, res) => {
    co(function*(){
        const resultData = yield database.getData(req.params.itemid)
        const {_id, content} = resultData
        res.json({
            _id,
            content,
        })
    })
})

app.post('/api/item', (req, res) => {
    co(function*(){
        const id = yield database.insertData(req.body.content)
        res.json({id})
    })
})

app.patch('/api/item/:itemid', (req, res) => {
    co(function *() {
        const response = yield database.updateData(req.params.itemid, req.body.content)
        res.json({'ok': true})
    })
})

app.delete('/api/item/:itemid', (req, res) => {
    co(function *() {
        const response = yield database.deleteData(req.params.itemid)
        res.json({'ok': true})
    })
})

app.listen(3000)