const express = require('express')
const axios = require("axios");
const app = express()
const cors = require('cors');

app.use(express.urlencoded({ extended: false}))
app.use(express.json())
app.use(cors())

let randomUser = {}
let goingLi = []
let notGoingLi = []

function handleData(user, thisList) {
    const duplicate = thisList.find((item) => item.login.uuid == user.login.uuid)
    if(!duplicate) {
        thisList.push(user);
        console.log('ITEM PUSHED TO GOING LIST')
    } else {
        console.log('DID NOT PUSH')
    }
}

// C O U N T E R   R E Q U E S T S

app.get('/api', (req, res) => {
    axios.get('https://randomuser.me/api/').then((response) => {
        console.log(response.data.results[0].name.first)
        res.json(response.data)
    })
})

app.post('/api/going', (req, res) => {
    handleData(req.body, goingLi)
    res.send('POST request called')
})

app.post('/api/notgoing', (req, res) => {
    handleData(req.body, notGoingLi)
    res.send('POST request called')
})


// G O I N G   C O M P O N E N T   R E Q U E S T S

app.get('/api/going', (req, res) => {
        res.json(goingLi)
})

app.get('/api/notgoing', (req, res) => {
        res.json(notGoingLi)
})


app.listen(3001, (req, res) => {
    console.log('listening on port 3001')
})