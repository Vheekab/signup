import express, { urlencoded } from 'express'

const app = express()

app.use(express.static('./'))
app.use(express.urlencoded({extended: true}))
app.set('view engine', 'ejs')



const loginArray = [
    {
        username: "",
        password: ""
    }
]

let username = ""
let password = ""


app.get('/', (req, res) => {
    res.render('pages/index', {check: "null"})
})

app.post('/checkuser', (req, res) => {
    loginArray.forEach(() => {
        if(loginArray.some(e => e.username === req.body.username)) {
            
            let checkIndex = loginArray.map(e => e.username).indexOf(req.body.username)

            if (loginArray[checkIndex].username == req.body.username && loginArray[checkIndex].password == req.body.password) {
                res.render('pages/welcome', {data: req.body.username})
            }

            else {
                res.render('pages/index', {check: "wrong"})
            }
        }
        else {
            res.render('pages/index', {check: "wrong"})
        }
    })
})

app.post('/createaccount', (req, res) => {
    res.render('pages/create', {create: "null"})
})

app.post('/accountcreated', (req, res) => {
    const newUsername = req.body.newUsername
    const newPassword = req.body.newPassword
    const fullName = req.body.fullName

    username = newUsername
    password = newPassword

    loginArray.push({username, password})

    res.render('pages/create', {create: "yes"})
})



const PORT = 4002 

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})