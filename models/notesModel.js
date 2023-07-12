const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Note title is required'],
        },
        content: {
            type: String,
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            // required: true,
            ref: 'User',
        },
        status: {
            type: String,
            enum: ['OPEN', 'COMPLETED'],
            default: 'COMPLETED'
        }
    },
    { timestamp: true }
);

// noteSchema.plugin(AutoIncrement, {
//     inc_field: 'ticket',
//     // id: 'ticketNum',
//     start_seq: 500
// });


// noteSchema.pre('save', function (next) {
//     const note = this;
//     if (note.isNew) {
//         mongoose.model('Counter').findOneAndUpdate(
//             { $inc: { seq: 500 } },
//             { new: true, upsert: true },
//             function (error, counter) {
//                 if (error) return next(error)
//                 note.ticket = counter.seq;
//                 next();
//             }
//         );
//     } else {
//         next();
//     }
// })


const notesModel = mongoose.model('Note', noteSchema)
module.exports = notesModel;