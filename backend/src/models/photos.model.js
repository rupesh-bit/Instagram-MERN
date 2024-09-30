import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const photoSchema = new Schema(
    {
        
        photo: {
            type: String, //cloudinary url
            required: true
        },
        title: {
            type: String, 
            required: true
        },
       
        views: {
            type: Number,
            default: 0
        },
        isPublished: {
            type: Boolean,
            default: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }

    }, 
    {
        timestamps: true
    }
)

photoSchema.plugin(mongooseAggregatePaginate)

export const Photo = mongoose.model("Photo", photoSchema)