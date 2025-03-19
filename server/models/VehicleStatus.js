const mongoose = require('mongoose');

const VehicleStatusSchema = new mongoose.Schema({
    requestId: { type: mongoose.Schema.Types.ObjectId, ref: 'vehicle_requests', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    vehicleType: { type: String, required: true },
    purpose: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: { type: String, enum: ['Approved', 'Rejected'], required: true },
    remarks: { type: String },
    reviewedBy: { type: String, required: true, default: "Admin" }
}, { collection: 'vehicle_status' });

const VehicleStatus = mongoose.model('VehicleStatus', VehicleStatusSchema);
module.exports = VehicleStatus;
