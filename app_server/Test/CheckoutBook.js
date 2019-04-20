const superagent = require('superagent');

function checkoutBook() {
    let book_checkouts = {
        book_id:'fcbc8823-047f-4e29-a93b-41ab969c24f8',
        book_checkout:[{
            copy_id:'fcbc8823-047f-4e29-a93b-41ab969c24f8',
            status:'checkout',
            borrower_id: '123456',
            borrower_name: 'Hai Nguyen',
            due_date: new Date(),
            borrow_date: new Date(),
            return_date: null,
        }]
    };


    console.log('Request Sent: \n', book_checkouts);
    superagent
        .put('http://localhost:3000/books/checkout')
        .send(book_checkouts) // sends a JSON post body
        .set('accept', 'json')
        .end((err, res) => {
            if(!err) {
                console.log('Result received: \n',  res.body);
            }else{
                console.log(err);
            }
        });
}
checkoutBook();