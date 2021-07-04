const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const MultiPolygonSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['MultiPolygon'],
        required: true
    },
    coordinates: {
        type: [
            [
                [
                    [Number]
                ]
            ]
        ], // Array of arrays of arrays of numbers
        required: true
    }
});

const AOISchema = new Schema({
    type: { type: String },
    properties: {
        Name_3: { type: String },
        CC: { type: String }
    },
    geometry: {
        type: MultiPolygonSchema,
        required: true
    }
}, {
    collection: 'aoi'
});

const AOIcModel = mongoose.model('AOI', AOISchema);

module.exports = AOIcModel;