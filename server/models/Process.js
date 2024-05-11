const mongoose = require('mongoose');

const { Schema } = mongoose;

const processSchema = new Schema({
    patient: {
        type: Schema.Types.ObjectId,
        ref: "Patient",
        required: true
    },
    startDate: {type: Date, required: true, default: Date.now()},
    endDate: Date,
    procedures: {
        type: [{
            department: {type: Schema.Typtes.ObjectId, ref: "Department", required: true},
            doctor: {type: Schema.Typtes.ObjectId, ref: "Doctor", required: true},
            date: {type: Date, required: true, default: Date.now()},
            operation: String,
            notes: {type: String, required: true},
        }],
        default: []
    }

})

const Process = mongoose.model('Process', processSchema);
module.exports = Process;