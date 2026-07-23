import mongoose from 'mongoose'

const itemsSchema= new mongoose.Schema({
    // id:{type: String, required: true},-> this line is not needed since mongoose create id by default
    title: {type: String, required: true},
    details: { type: String, required: true}
})

export default mongoose.model('items', itemsSchema)