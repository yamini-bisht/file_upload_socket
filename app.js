const express = require('express'),
    socket = require('socket.io'),
    fs = require('fs'),
    path = require('path'),
    app = express(),
    PORT = 8060,
    server = app.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`);
    });
app.use(express.static(__dirname));
const io = socket(server);
var filename = '';
io.on('connection', (socket) => {
    socket.on('img-chunk', function (data) {
        filename = data.name;
        var writeFile = fs.writeFile("./" + data.name, data.arrayBuffer, function (err) {
            if (err) {
                return console.log(err);
            }
        });
    });
    let readstream = fs.readFileSync(path.resolve(__dirname, "./fullmetal.jpeg"));
    let image64 = new Buffer(readstream).toString("base64");
    socket.emit('upload', image64);
});