const superagent = require('superagent');


function createBook() {

    let book = {
        book_id: '',
        title: 'Book Title',
        isbn: 'isbn',
        des: 'Description',
        author: ['Author'],
        loan_duration: 15,
        price: 0,
        image: "imageurl",
        number_of_copies: 0,
        copy_number: 10,
        copy_note: "This is test",
        tag: ["Web", "Programming"],
        created_date: new Date(),
        modified_date: new Date()
    }

    console.log('Request Sent: \n', book);
    superagent
        .post('http://localhost:3000/books')
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

function createBook_old() {

    const uuidv4 = require('uuid/v4');
    const uuid = uuidv4();
     let book = {
        book_id: uuid,
        title:"Java Programming",
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
        .post('http://localhost:3000/books')
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
createBook();