const express = require('express')
const app = express();
const db = require('./db/mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv')
const path = require('path');


app.use(cors({
    origin: "*"
}))

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//server frontend
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '../build')))

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'build', 'index.html')))
}
else {
    app.get('/', (req, res) => res.send('Please set to production'))
}


app.post("/*", async (req, res) => {
    console.log(req.url)
    //db()
   
    //res.json("hello");
})



var PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    //console.log(`The server is listen to port ${PORT}`)
})