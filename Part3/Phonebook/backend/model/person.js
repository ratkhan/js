const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);



const personSchema = new mongoose.Schema({
    name: {
        type:String,
        unique: true,
        minlength: 3,
        required: true
    },
    number: {
        type:String,
        minlength:8,
        required:true
    },
    id: {
        type:String,
        required:true
    },
});

personSchema.set('toJSON', {
    transform: (document, returnObject) => {
        delete returnObject._id;
        delete returnObject.__v;
    }
});
personSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Person', personSchema);