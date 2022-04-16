import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    stock: Number,
    selectedFile: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

var PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;