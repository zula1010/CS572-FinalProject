const superagent = require('superagent');

function updateBook() {

    const uuidv4 = require('uuid/v4');
    const uuid = uuidv4();
     let book = {
        book_id: 'a312dd17-95ce-4ce2-bf93-3fa24dcb71e4',
        title:"Modern Web Programming",
        isbn:"isbn",
        price: 123,
        image:"imageurl",
        number_of_copies: 5,
        loan_duration: 5,
        book_copies:[],
        book_checkouts:[],
        history:[],
        tag:["Web", "Programming"],
        author: ["Asaad saad"],
        created_date:new Date(),
        modified_date: new Date(),
    };

    console.log('Request Sent: \n', book);
    superagent
        .put('http://localhost:3000/books')
        .send(book) // sends a JSON post body
        .set('accept', 'json')
        .end((err, res) => {
            if(!err) {
                console.log('Result received: \n',  res.body);
            }else{
                console.log(err);
            }
        });
}
updateBook();