const express = require('express')
const mongoose = require('mongoose')
const Sign = require('./model/logininfo')
const app = express();
require('dotenv').config()
const dbURI = process.env.connect
var log = 0;
var resu=-1;
var errmsg="";
var s=-1,p=-1,c=-1;
var senti = "the intended sentiment was";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        app.listen(process.env.PORT, () => {
            log = 0;
            resu=-1;
            errmsg="";
        })
    })
    .catch((err) => console.log(err));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
var username = 'Sign'
app.set('view engine', 'ejs');

app.get('/register', (req, res) => {
    res.render('register', { username,errmsg,log });
})



app.post('/register', async (req, res) => {
    // console.log(req.body);
    try{
        const email = req.body.email;
        // const password = req.body.password;

        const details = await Sign.findOne({ email: email });

        try {
            if(req.body.confirmpassword != req.body.password) {
                redirect(303, '/register');
                log=0;
            }
            else{
                const signdet = new Sign({
                    email: req.body.email,
                    fname: req.body.fname,
                    sname: req.body.sname,
                    password: req.body.confirmpassword
                });
                username = req.body.fname;
                log=1;
                res.redirect(301, '/index');
                signdet.save();
            }
        }
        catch (err) {
            redirect(303, '/register');
            console.log(err);
        }
    }
    catch (err) {
        errmsg="already registered by this email";
        res.redirect(301,'/register')
    }
})



app.get('/index', (req, res) => {
    res.render('index', { username,resu });
})




app.get('/sig=8n', (req, res) => {
    log = 0;
    resu=-1;
    errmsg="";
    res.render('sign', { username ,errmsg,log })
})


app.get('/home1', (req, res) => {
    res.render('home1', { username, log });
})

app.get('/home2', (req, res) => {
    res.render('home2', { username, log });
})


app.get('/home', (req, res) => {
    res.render('home', { username, log });
})


const multer = require ('multer');
const { stringify } = require('querystring');
const storage=multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'Images')
    },
    filename : (req, file, cb) => {
        console.log(file)
        cb(null, "img.jpeg");
    }
})


const upload=multer({storage: storage})

app.get('/result', (req, res) => {
    res.render('result', { username,resu });
})


app.get('/load9ing', (req, res) => {
    res.render('loading', { username,p,s,c,log,senti});
})


app.post('/home', upload.single("image") , async(req, res) => {
        s=-1;p=-1;c=-1;
        console.log(req.file)
        const { spawn } = require('child_process');
        const childPython = spawn('python', ['pneumoniaprediction.py']);
        resu=-1;
        childPython.stdout.on('data', (data) => {
            senti="patient is "
            resu=1;
            p=1;
            s1=`${data}`;
            senti+=" ";
            x=parseFloat(s1);
            k=parseInt(x*10000);
            x=k/100;
            console.log(x);
            senti+=x;
            senti+="% likely to be Pneumonia positive";
            console.log(senti);
            p=1;
        });
        childPython.stderr.on('data', (data) => {
            // console.log(`stderr: ${data}`);
        });
        childPython.on('close', (code) => {
            // console.log(`exit code: ${code}`);
        });
        res.redirect(301, '/load9ing');
})




app.post('/home1', async(req, res) => {
        s=-1;p=-1;c=-1;
        const sentiment = req.body.sentiment;
        console.log(req.body);
        const { spawn } = require('child_process');
        const childPython = spawn('python', ['sentimentprediction.py',sentiment]);
        resu=-1;
        childPython.stdout.on('data', (data) => {
            senti = "the intended sentiment was"
            s=1
            s1=`${data}`;
            senti+=" ";
            x=parseFloat(s1);
            k=parseInt(x*10000);
            x=k/100;
            console.log(x);
            senti+=x;
            senti+="% positive";
            console.log(senti);
            // console.log(`stdout : ${data}`);
        });
        childPython.stderr.on('data', (data) => {
            // console.log(`stderr: ${data}`);
        });
        childPython.on('close', (code) => {
            // console.log(`exit code: ${code}`);
        });
        res.redirect(301, '/load9ing');
})




app.post('/home2', async(req, res) => {
    s=-1;p=-1;c=-1;
    const sentiment = req.body.clickbait;
    console.log(req.body);
    const { spawn } = require('child_process');
    const childPython = spawn('python', ['clickbaitprediction.py',sentiment]);
    resu=-1;
    childPython.stdout.on('data', (data) => {
       c=1
       senti="this title is "
       s1=`${data}`;
       senti+=" ";
            x=parseFloat(s1);
            k=parseInt(x*10000);
            x=k/100;
            console.log(x);
            senti+=x;
       senti+="% likely to be click baith";
       console.log(senti);
       // console.log(`stdout : ${data}`);
   });
   childPython.stderr.on('data', (data) => {
       // console.log(`stderr: ${data}`);
   });
   childPython.on('close', (code) => {
       // console.log(`exit code: ${code}`);
   });
   res.redirect(301, '/load9ing');
})





app.post('/sign', async (req, res) => {
    try {
        console.log(req.body)
        const email = req.body.email;
        // const password = req.body.password;

        const details = await Sign.findOne({ email: email });
        var b = req.body.password == details.password;
        if (b) {
            log =1;
            username = details.fname;
            res.redirect(301, 'index');
        }
        else {
            log = 0;
            username = 'Sign'
            res.redirect(301, '/sig=8n');
        }
    }
    catch (error) {
        errmsg="incorrect email or password";
        res.redirect(301, '/sig=8n');
    }
})