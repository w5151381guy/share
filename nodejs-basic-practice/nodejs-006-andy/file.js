const fs = require('fs')
const uuidv4 = require('uuid/v4')

function readData() {
    return new Promise((resolve, reject) => {
        fs.readFile('data.txt', (err , data) => {
            if(err) reject(err)
            const data_string = data.toString().replace('}{', '},{')
            resolve(data_string)
        })
    })
}

function writeData(new_data) {
    return new Promise((resolve, reject) => {
        fs.writeFile('data.txt', new_data, err => {
            if(err) reject(err)
            resolve()
        })
    })
}

function findContent(id) {
    return readData().then(data => {
        const data_arr = JSON.parse(`[${data}]`)
        const data_filter = data_arr.filter(el => el.id === id)
        return data_filter
    })
}

function writeContent(content) {
    const id = uuidv4()
    return readData()
        .then(data => {
            const new_data = data + JSON.stringify({id, content})
            return new_data
        })
        .then(writeData)
        .then(() => id)
}

function updateContent(id, content) {
    return readData()
        .then(data => {
            const data_arr = JSON.parse(`[${data}]`)
            const data_filter = data_arr.filter(el => el.id === id)
            const new_data = data.toString().replace(data_filter[0].content, content)
            return new_data
        })
        .then(writeData)
        .then(() => JSON.stringify({ok: true}))
}

function deleteContent(id) {
    return readData()
        .then(data => {
            let data_arr = JSON.parse(`[${data}]`)
            const index = data_arr.findIndex(el => el.id === id)
            data_arr.splice(index, 1)
            let data_string = JSON.stringify(data_arr)
            return data_string.slice(1, data_string.length-1)
        })
        .then(writeData)
        .then(() => JSON.stringify({ok: true}))
}

module.exports = {findContent, writeContent, updateContent, deleteContent}
