import mongoose, {Schema} from "mongoose"

const followersSchema = new Schema({
    followers: {
        type: Schema.Types.ObjectId, // one who is subscribing
        ref: "User"
    },
    following: {
        type: Schema.Types.ObjectId, // one to whom 'subscriber' is subscribing
        ref: "User"
    }
}, {timestamps: true})



export const Subscription = mongoose.model("Subscription", followersSchema)