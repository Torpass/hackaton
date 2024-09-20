import express from 'express';
import fs from 'fs';
const router = express.Router();
const PATH_ROUTES = __dirname;

const removeExtension = (fileName:String) => {
    return fileName.split('.').shift();
};

fs.readdirSync(PATH_ROUTES).filter((file) => {
    const name = removeExtension(file);
    if(name !== 'index'){
        console.log(`ruta actual: ${name}`)
        router.use(`/${name}`, require(`./${file}`));
    }
});

export default router;