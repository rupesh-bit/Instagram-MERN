import mongoose from 'mongoose';
import { DB_NAME } from "../constants.js";


const connectDB= async ()=>{
  console.log(process.env.MONGODB_URI)
mongoose.connect(`${process.env.MONGODB_URI}/insta`)
//mongoose.connect('mongodb+srv://rupesh:rupesh123@cluster0.tqllaku.mongodb.net/hhh')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });


}

export default connectDB