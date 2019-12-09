const path = require('path');
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
var cors = require('cors')
const User = require('./models/user.js')
const router = require('./router/router.js')(app, User);
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');


app.use(bodyParser());
app.use(cors());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use("/", express.static(__dirname + '/'))

const mongoose = require('mongoose');
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
    console.log('DB connection good.');
})

mongoose.connect("mongodb://localhost/project_sparcs", (err) => {
    if (err) {
        console.log("Connectedddd NOT");
    }
    console.log('CONNECTED MAN');
});


app.listen(3000, function() {
	console.log("heard on 3000");
});