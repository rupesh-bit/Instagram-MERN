import mongoose from "mongoose"
import {Photo} from "../models/photos.model.js"
import {Subscription} from "../models/subscription.model.js"
import {Like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getChannelStats = asyncHandler(async (req, res) => {
    // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.
    console.log("gghggj")

    res.status(200)
    .json(
        new ApiResponse(200,"ff","ffggfggfgf")
    )
})

const getChannelPhotos = asyncHandler(async (req, res) => {
    // TODO: Get all the videos uploaded by the channel
    const { page = 1, limit = 12, query, sortBy } = req.query
    const userId= req.user._id
    const skip=(page-1)*limit


     const userPhoto= await Photo.aggregate(
        [
            {$match: {
              owner:userId
            }},
            { $sort: { createdAt: -1 } },     // Sorting stage
            { $skip:Number(skip)  },                  // Pagination - Skip documents
            { $limit: Number( limit) } , 
        
             ]
     )

     if(!userPhoto){
        throw new ApiError(500,"can't get photo from DB")
       }


    res.status(200)
    .json(
        new ApiResponse(200,userPhoto,"ffggfggfgf")
    )
})

export {
    getChannelStats, 
    getChannelPhotos
    }