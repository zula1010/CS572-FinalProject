const superagent = require('superagent');

function addBookCopies() {

    let bookCopies = {

        book_id:'fcbc8823-047f-4e29-a93b-41ab969c24f8',
        no: 10,
        note: 'Copied in April 2019',
        created_date: new Date(),
    }

    console.log('Request Sent: \n', bookCopies);
    superagent
        .put('http://localhost:3000/books/copies')
        .send(bookCopies) // sends a JSON post body
        .set('accept', 'json')
        .end((err, res) => {
            if(!err) {
                console.log('Result received: \n',  res.body);
            }else{
                console.log(err);
            }
        });
}
addBookCopies();