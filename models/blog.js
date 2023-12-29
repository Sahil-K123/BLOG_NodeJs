const {Schema, model} = require('mongoose')


const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    coverimageURL: {
        type: String,
        required: false,
    },
    createdBy: {
        type: Schema.Types.ObjectId, //built in type,
        ref: 'user', // now this created by points to user
    }
}, {
    timestamps: true
})


const Blog = model('blog', blogSchema);

module.exports = Blog;