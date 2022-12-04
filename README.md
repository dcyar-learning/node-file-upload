# Upload files with NodeJs

## Upload options:

-   Upload to public directory
-   Upload to cloudinary

## Packages

-   express
-   express-fileupload
-   cloudinary
-   uuid

## Instructions

1. Clone this repository

```bash
git clone https://github.com/dcyar-learning/node-file-upload

cd node-file-upload

cp .env.example .env
```

2. Set your cloudinary url on `.env` file

```
CLOUDINARY_URL=xxx-xxxx-xxxx
```

3. Install dependencies and run, I use [pnpm](https://pnpm.io/installation) in this project

```bash
pnpm install

pnpm start

# With nodemon
pnpm dev
```

4. Upload options

-   Visit `http://localhost:3000` for upload to public folder
-   Visit `http://localhost:3000/cloudinary` for upload to cloudinary

<br />

Enjoy :)
