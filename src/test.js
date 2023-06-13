const https = require('https');

const projectId = '2KhkyHx6ag97KJ6lJJpZaQdNF2h';
const projectSecret = 'cda2a42846ea69280f94f263590af556';

const options = {
    host: 'ipfs.infura.io',
    port: 5001,
    path: '/api/v0/pin/add?arg=QmeGAVddnBSnKc1DLE7DLV9uuTqo5F7QbaveTjr45JUdQn',
    method: 'POST',
    auth: projectId + ':' + projectSecret,
};

let req = https.request(options, (res) => {
    let body = '';
    res.on('data', function (chunk) {
        body += chunk;
    });
    res.on('end', function () {
        console.log(body);
    });
});
req.end();





