const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

const port=process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('toUpper', (text) => {
    return text.toUpperCase()
});

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now} : ${req.method} ${req.url}`;
    fs.appendFileSync('server.log', log + '\n', (err) => {
        console.log('Unable to append server.log');
    });
    console.log(log);
    next();
});

/*  For displaying maintenance page with oyut next() method

app.use((req, res, next) => {
    res.render('maintenance.hbs', {
        pageMessage: 'We will be back Soon!!'
    });
});

*/

app.use(express.static(__dirname + '/public'));



app.get('/', (req, res) => {
    //res.send('Hello Express!');
    /* res.send({
         name:'dwijesh',
         likes: ['c','node','angular']
 
     }); */

    res.render('home.hbs', {
        pageTitle: 'Home Page',
        //currentYear: new Date().getFullYear(),
        pageMessage: 'Welcome to Homepage!!'
    });
});

app.get('/about', (req, res) => {
    //.send('About page!');
    res.render('about.hbs', {
        pageTitle: 'About Page',
        //currentYear: new Date().getFullYear()
    });
})


app.get('/projects', (req, res) => {
    //.send('About page!');
    res.render('projects.hbs', {
        pageTitle: 'Portfolio Page',
        pageMessage: 'Welcome to Projects page!!'    
    });
})

app.get('/bad', (req, res) => {
    res.send({
        error: 'Bad Request'
    });
})

app.listen(port, () => {
    console.log(`Server is up on port : ${port}`);
});