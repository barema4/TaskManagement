const mongoose = require('mongoose')
const slugify = require('slugify')


const TaskManagementSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        trim: true,
        maxLength: [50, 'Name can not be more than 50 characters']
    },
    slug: String,
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxLength: [500, 'Name can not be more than 500 characters']
    },
      createdAt: {
        type: Date,
        default: Date.now
      },
})
// create task slug from the name

TaskManagementSchema.pre('save', function(next){
  this.slug = slugify(this.name, {lower: true});
  next()
})

module.exports = mongoose.model('TaskManagement', TaskManagementSchema)