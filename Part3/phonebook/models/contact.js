const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_URI;

console.log("connecting to ", url);

mongoose.connect(url)
    .then(result => {
        console.log("connected")
    })
    .catch(error => {
        console.log("error: ", error.message);
    });

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        minLength: 8,
        validate: {
            validator: function (v) {
                return /^[0-9]{2,3}-[0-9]+$/.test(v)
            },
            message: props => `${props.value} is not a valid phone number! The format should be 00- or 000-`
        },
        required: true
    }
});

contactSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id
        delete returnedObject._v
    }
});

module.exports = mongoose.model("Contact", contactSchema)