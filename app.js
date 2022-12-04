const path = require('path');
require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const fileupload = require('express-fileupload');
const { v4: uuid } = require('uuid');
const cloudinary = require('cloudinary').v2;

cloudinary.config(process.env.CLOUDINARY_URL);

const app = express();

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    fileupload({
        useTempFiles: true,
        tempFileDir: '/tmp/',
        createParentPath: true,
    })
);

app.get('/', (req, res) => {
    res.writeHead(200, { 'content-type': 'text/html' });
    res.end(`<h1>Upload Your File Here :)</h1>

    <form action="/" method="post" enctype="multipart/form-data">
        <fieldset>
            <legend>Upload your file</legend>
            <label for="photo">File:</label>
            <input type="file" name="photo" id="photo" />
        </fieldset>
        <button type="submit">Upload</button>
    </form>`);
});
app.post('/', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    const photo = req.files.photo;
    const extension = photo.mimetype.split('/')[1];
    const validExtensions = ['png', 'pdf'];

    if (!validExtensions.includes(extension)) {
        return res.status(400).send('Not valid file extension');
    }

    const photoPath = `/images/${uuid()}.${extension}`;
    const uploadPath = `${__dirname}/public${photoPath}`;

    photo.mv(uploadPath, function (err) {
        if (err) return res.status(500).send(err);

        res.send(`<p>File uploaded!</p> <a href="${photoPath}">File here</a>`);
    });
});

app.get('/cloudinary', (req, res) => {
    res.writeHead(200, { 'content-type': 'text/html' });
    res.end(`<h1>Upload Your File Here :)</h1>

    <form action="/cloudinary" method="post" enctype="multipart/form-data">
        <fieldset>
            <legend>Upload your file</legend>
            <label for="photo">File:</label>
            <input type="file" name="photo" id="photo" />
        </fieldset>
        <button type="submit">Upload</button>
    </form>`);
});

app.post('/cloudinary', async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    const photo = req.files.photo;
    const extension = photo.mimetype.split('/')[1];
    const validExtensions = ['png', 'pdf'];

    if (!validExtensions.includes(extension)) {
        return res.status(400).send('Not valid file extension');
    }

    const photoName = uuid() + '.' + extension;

    const uploaded = await cloudinary.uploader.upload(photo.tempFilePath, {
        folder: 'images',
    });

    // Store public url
    const { secure_url } = uploaded;

    res.send(
        `<p>File uploaded to cloudinary!</p> <a href="${secure_url}">File here</a>`
    );
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
