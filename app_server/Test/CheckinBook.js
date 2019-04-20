const superagent = require('superagent');

function checkinBook() {
    let book_checkout = {
        book_id:'fcbc8823-047f-4e29-a93b-41ab969c24f8',
        copy_id:'fcbc8823-047f-4e29-a93b-41ab969c24f8',
        borrower_id:'123456',
        return_date: new Date(),
    };


    console.log('Request Sent: \n', book_checkout);
    superagent
        .put('http://localhost:3000/books/checkin')
        .send(book_checkout) // sends a JSON post body
        .set('accept', 'json')
        .end((err, res) => {
            if(!err) {
                console.log('Result received: \n',  res.body);
            }else{
                console.log(err);
            }
        });
}
checkinBook();