const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const CamplocaSchema = new Schema({
    "New_Camp_SSID": { type: String },
    "New_Camp_Name": { type: String },
    "Settlement Type": { type: String },
    "District": { type: String },
    "Upazila": { type: String },
    "Union": { type: String },
    "Geo_Code": { type: String },
    "Total_HH": { type: String },
    "Total_Individuals": { type: String },
    "Latitude": { type: String },
    "Longitude": { type: String }
}, {
    collection: 'camp'
});

const CamplocModel = mongoose.model('Camploc', CamplocaSchema);

module.exports = CamplocModel;