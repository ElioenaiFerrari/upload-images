const express = require('express');
const path = require('path');
const multer = require('./middlewares/multer');

const app = express();


app.use(express.static(path.join(__dirname, '..', '..', 'public')));
app.use(express.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, '..', '..', 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


app.get('/new-file', (req, res, next) => {
    res.render('index.html');
});


app.post('/new-file', multer.single('image'), (req, res, next) => {
    if (req.file) {
        return res.send(req.file);
    }
    return res.send('Erro ao fazer upload do arquivo');
});

app.listen(3000);