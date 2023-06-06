const express = require('express')
const axios = require("axios");
const app = express()

app.use(express.urlencoded({ extended: false}))
app.use(express.json())

let randomUser = {}
let goingLi = []
let notGoingLi = []

function handleData(user, thisList) {
    const duplicate = thisList.find((item) => item.login.uuid == user.login.uuid)
    if(!duplicate) {
        thisList.push(user);
        console.log('ITEM PUSHED TO GOING LIST')
    }
}

// C O U N T E R   R E Q U E S T S

app.get('/api', (req, res) => {
    axios.get('https://randomuser.me/api/').then((response) => {
        res.json(response.data)
    })  
})

app.post('/api/going', (req, res) => {
    handleData(req.body, goingLi)
})

app.post('/api/notgoing', (req, res) => {
    handleData(req.body, notGoingLi)
})


// G O I N G   C O M P O N E N T   R E Q U E S T S

app.get('/api/going', (req, res) => {
    if(goingLi.length) {res.json(goingLi)}
    console.log('got it')
})

app.get('/api/notgoing', (req, res) => {
    if(notGoingLi.length) {res.json(notGoingLi)}
})


app.listen(3001, (req, res) => {
    console.log('listening on port 3001')
})