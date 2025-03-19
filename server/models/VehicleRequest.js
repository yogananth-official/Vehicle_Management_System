const mongoose = require('mongoose');

const VehicleRequestSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    vehicleType: { type: String, required: true, enum: ['Car', 'Bus', 'Van'] },
    purpose: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    comments: { type: String },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
    remarks: { type: String }  // Added remarks field
}, { collection: 'vehicle_requests' });

const VehicleRequest = mongoose.model('VehicleRequest', VehicleRequestSchema);
module.exports = VehicleRequest;
