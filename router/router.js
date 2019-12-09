const bodyParser = require('body-parser');
const session = require('express-session');
    var cookieParser = require('cookie-parser');
module.exports = func

function func(app, User) {
/* parsing */
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(session({
        secret: 'Hey please do not hack my website...'
    }));
    /* Routing */
    app.get('/', (req, res) => {
        return res.render('index');
    })

    app.post('/api/myinfo', (req, res) => {

        User.findOne({ id: req.session.user }, (err, user) => {
            if (err) return res.redirect('/sign_up');
            else if (user !== null) {
                console.log(user);
                req.session.name = user.name;
                req.session.email = user.email;
                req.session.image = user.name + ".jpg";
                console.log("BODY" + req.session.name); 
                return res.render('myinfo', { session: req.session });
            }
        });
    })

    app.get('/api/main', (req, res) => {
        console.log(req.cookies);
        return res.render('main', { req: req, res: res });
    })

    app.get('/signin', (req, res) => {
        return res.render('signin.html', { req: req, res: res });
    })

    app.get('/signin.html/:errorcode', (req, res) => {
        var err = req.params.errorcode;
        console.log("WORKING FINE");
        return res.render('signin.html?errorcode=' + err);
    })

    app.get('/api/signin.html/:errorcode', (req, res) => {
        var err = req.params.errorcode;
        console.log("WORKING FINE");
        return res.render('signin.html?errorcode=' + err);
    })


    app.get('/api/signin.html/:errorcode/:id', (req, res) => {
        var err = req.params.errorcode;
        var userid = req.params.id;
        return res.render('signin.html?errorcode=' + err + '&id=' + userid);
    })


    app.post('/api/thisweek', (req, res) => {
        return res.render('thisweek', { req: req, res: res });

    })

    app.post('/api/myinfo', function (req, res) {
        console.log(req.body.xpos);
        console.log(req.body.pos);
        var responseData = { 'xpos': req.body.xpos, 'ypos': req.body.ypos }
        res.json(responseData);
    })



        
    app.post('/api/add', (req, res) => {
        /* 빈 input인지 확인 */
        if (req.body.id.length === 0 || req.body.password.length === 0) {
            console.log('Wrong input');
            return res.redirect('../views/signin.html?errorcode=1');
        }

        User.findOne({ id: req.body.id}, (err, user) => {
            if (err) return res.redirect('/sign_up');
            else if (user !== null) {
                console.log('ID already exists');
                return res.redirect('../views/signin.html?errorcode=2&id=' + req.body.id);
            }
            /* id가 존재하지 않으면 db에 저장 */
            else {
                const newuser = new User();
                newuser.id = req.body.id;
                newuser.password = req.body.password;
                newuser.email = req.body.email;
                newuser.name = req.body.name;
                newuser.birthday = req.body.birthday;
                newuser.address = req.body.address;

                newuser.save(err => {
                    if (err) {
                        console.log(err);
                        return res.render('/signin');
                    }
                    console.log('good database created');
                    return res.redirect('../views/signin.html?errorcode=0');
                });
            }
        });
    });

    app.post('/api/verify', (req, res) => {
        console.log('process/login 호출됨!')
        var paramID = req.body.id || req.query.id
        var paramPW = req.body.password || req.query.password;
        console.log('paramID : ' + paramID + ', paramPW : ' + paramPW);

        if (req.session.user) {
            console.log('이미 로그인 되어 있음');
            res.render('main', { user: req.session.user});
        }

        if (User) {
            console.log(User)
            authUser(User, paramID, paramPW,
                function (err, docs) {
                    if (err) {
                        console.log("ERROR!")
                        res.writeHead(200, { "Content-Type": "text/html;characterset=utf8" });
                        res.write("<h1>에러발생</h1>");
                        res.end();
                        return;
                    }
                        
                    if (docs) {
                        req.session.regenerate(function () {
                            req.session.logined = true;
                            req.session.user = req.body.id;
                            console.log("WE ARE HERE AND" + req.session.user);
                            res.render('main', {req: req, res: res, user: req.session.user });

                        });
                      
 
                    }

                    else {
                        console.log('empty error!');
                        return res.redirect('../views/signin.html?errorcode=3')
                    }
                });
        }

        else {
            console.log('DB 연결 안됨');
            res.writeHead(200, { "Content-Type": "text/html; characterset=utf8" })
            res.write('<h1>database 연결 안됨 </h1>');
            res.end();
        }
    });

    var authUser = function (User, id, password, callback) {
        console.log('authUser CALLED');
        User.find({ "id": id, "password": password}, (err, docs) => {
            if (err) {
                callback(err, null);
                return;
            }
            if (docs.length > 0) {
                console.log('find user [ ' + docs + ' ]');
                callback(null, docs);
            }
            else {
                console.log('can not find user [ ' + docs + ' ]');
                callback(null, null);
            }

           
        })
    }

    app.use((req, res, next) => {
        res.locals.user = req.session.user;
        console.log("DEBUGGING" + res.locals.user);
        next();
    });


        app.post('/thisweek/write', (req, res) => {
            return res.render('write');
        });

    

    console.log("HI");
}