
const mongoose = require('mongoose');

const schema = {
    book_id:String,
    title:String,
    isbn:String,
    price: Number,
    image:String,
    number_of_copies: Number,
    loan_duration: Number,
    book_copies:[{
        note: String,
        created_date: Date,
        copies:[{
            copy_id: String
         }]
    }],
    book_checkouts:[{
        copy_id: String,
        status:String,
        borrower_id: String,
        borrower_name: String,
        due_date: Date,
        borrow_date: Date,
        return_date: Date
    }],
    history:[{copy_id: String,
        borrower:{}}
    ],
    tag:[],
    author: [],
    created_date:Date,
    modified_date: Date,
};

const BookSchema = new mongoose.Schema(schema);

//Indexes
BookSchema.index({title: 'text'});
BookSchema.index({isbn: 1});

BookSchema.pre('save', (next) =>{
    const curDate = new Date();
    this.created_date =  curDate;
    if(this.isNew){
        this.created_date = curDate;

    }
    next();
})

BookSchema.pre('update', (next) =>{
    const curDate = new Date();
    this.modified_date =  curDate;
    if(!this.created_date){
        this.created_date = curDate;
    }
    next();
})


module.exports =  mongoose.model('Book',BookSchema, 'books');

