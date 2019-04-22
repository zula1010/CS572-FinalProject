interface Reader {
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        default: "123"
    },
    address: {
        state: {
            type: String,
        },
        city: {
            type: String,
        },
        zip: {
            type: Number,
        },
        street: {
            type: String
        }
    },
    phonenumber: {
        type: String,
    },
}

export default Reader;