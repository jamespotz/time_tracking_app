import mongoose from 'mongoose'
const Schema = mongoose.Schema

const TimeLogsSchema = new Schema({
  description: String,
  time_in: { type: Date, required: true },
  time_out: Date,
  user_id: { type: String, required: true },
  ipAddress: { type: String, required: true }
}, { timestamps: true })

export default mongoose.model('TimeLog', TimeLogsSchema)

