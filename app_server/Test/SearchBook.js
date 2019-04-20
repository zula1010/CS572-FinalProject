const superagent = require('superagent');
const axios = require('axios');

function searchBook() {

    const uuidv4 = require('uuid/v4');

    let search = {
        text: 'Web',
        isbn: ''
     };

    console.log('Request Sent: \n', search);

    axios.get('http://localhost:3000/books/search', {params: search })
        .then(function (res) {
            console.log('Result received: \n',  res.data);
        })
        .catch(function (error) {
            console.log(error);
        })

}
searchBook();