const mongoose = require('mongoose');
const { Schema } = mongoose;

const TaskSchema = new Schema(
  {
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  locked: { type: Boolean, default: false }
}
);

module.exports = mongoose.model('Task', TaskSchema);
