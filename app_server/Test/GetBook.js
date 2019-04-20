const superagent = require('superagent');
const axios = require('axios');

function getBook() {

    const uuidv4 = require('uuid/v4');

     let book = {
        book_id: 'a312dd17-95ce-4ce2-bf93-3fa24dcb71e4',
     };

    console.log('Request Sent: \n', book);

    axios.get('http://localhost:3000/books/book', {params: book })
        .then(function (res) {
            console.log('Result received: \n',  res);
        })
        .catch(function (error) {
            console.log(error);
        })

}
getBook();