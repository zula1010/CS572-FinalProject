const axios = require('axios');

function getBook() {
     let book = {
        book_id: 'a312dd17-95ce-4ce2-bf93-3fa24dcb71e4',
     };

    console.log('Request Sent: \n', book);

    axios.get('http://localhost:3000/books', {params: book })
        .then(function (res) {
            console.log('Result received: \n',  res.body);
        })
        .catch(function (error) {
            console.log(error);
        })
}
getBook();