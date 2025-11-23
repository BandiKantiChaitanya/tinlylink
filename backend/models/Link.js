const mongoose=require('mongoose')

const schema=mongoose.Schema

const linkSchema=schema({
    originalUrl: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^(https?:\/\/)/.test(v);
      },
      message: 'URL must be valid and start with http:// or https://'
    }
  },
  shortCode: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: false,
    match: /^[A-Za-z0-9]{6,8}$/,
  },
  clicks: {
    type: Number,
    default: 0
  },
  lastClicked: {
    type: Date
  }
},{timestamps: true}
)

const Links=mongoose.model('Links',linkSchema)

module.exports=Links