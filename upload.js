const socket = io.connect();

socket.on('upload', (image) => {
    var img = document.getElementById('output');
    img.setAttribute('src', 'data:image/jpeg;base64,' + image);
})
