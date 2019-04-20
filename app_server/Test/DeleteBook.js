const axios = require('axios');

function createBook() {
    const uuidv4 = require('uuid/v4');

    let book = {
        book_id: '2c120f1f-92f7-4c3b-b08e-fe5d26063dcc',
    };

    console.log('Request Sent: \n', book);

    axios.delete('http://localhost:3000/books/book',{data: book})
        .then(function (res) {
            console.log('Result received: \n',  res);
        })
        .catch(function (error) {
            console.log(error);
        })
}
createBook();