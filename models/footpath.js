const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const MultiLineStringSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['MultiLineString'],
        required: true
    },
    coordinates: {
        type: [
            [
                [Number]
            ]
        ], // Array of arrays of arrays of numbers
        required: true
    }
});

const FootpathSchema = new Schema({
    type: { type: String },
    properties: {
        Type: { type: String },
        Location: { type: String },
        source: { type: String },
        ShpLength: { type: Number },
        OBJECTID: { type: Number }
    },
    geometry: {
        type: MultiLineStringSchema,
        required: true
    }
}, {
    collection: 'foothpath'
});

const FootpathlocModel = mongoose.model('Footpathloc', FootpathSchema);

module.exports = FootpathlocModel;