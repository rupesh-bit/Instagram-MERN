import mongoose from "mongoose"
import {ObjectId}  from "mongodb"
import {Comment} from "../models/comment.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getVideoComments = asyncHandler(async (req, res) => {
    //TODO: get all comments for a video
    const {photoId} = req.params
    const {page = 1, limit = 10} = req.query

    const skip = (page - 1) * limit;
   // console.log(videoId,req.query)


    const comment= await Comment.aggregate(
        [
            {
              $match: {
            
                 photo:new ObjectId(photoId)
              }
            },
            {
              $lookup: {
                from: "users",
                localField: "owner",
                foreignField:"_id",
                as: "user"
              }
            },
            {
              $unwind:  '$user'
              
            },{
                $addFields: {
                    isedited: {
                               $cond: {
                                  if: {$eq: ['$createdAt', '$updatedAt']},
                                  then: false,
                                  else: true
                                     }
                            },
                 
                    isUsersComment:{
                        $cond: {
                            if: {$eq: [req.user?._id, "$user._id"]},
                            then: true,
                            else: false
                        }
                    }
                 }
                   
                 
            },
            
            {
              $project: {
                content:1,
                createdAt:1,
                isedited:1,
                isUsersComment:1,
                "user.avatar":1,
                "user.username":1,
                "user.fullName":1 
              }
            },
            { $sort: { createdAt: -1 } },     // Sorting stage
            { $skip: Number(skip)  },                  // Pagination - Skip documents
            { $limit: Number( limit) }                 // Pagination - Limit documents
            
          ]
    )

    if(!comment.length){
        throw new ApiError(500,"no comment avalable")
    }
    res.status(200)
    .json(
        new ApiResponse(200,comment,"comment fitched successfully")
    )

})

const addComment = asyncHandler(async (req, res) => {
    // TODO: add a comment to a video
    const {comment}=req.body
    console.log(req.params)

    const addComment=await Comment.create({
        content:comment,
        video:req.params.videoId,
        owner:req.user._id
    })
    
    const createdComment=await Comment.findById(addComment._id)

     if(!createdComment){
        throw new ApiError(500,"failed to add comment")
     }

     res
     .status(200)
     .json(
        new ApiResponse(200,createdComment,"added comment successfully")
     )
    
})

const updateComment = asyncHandler(async (req, res) => {
    // TODO: update a comment
    const {commentId}=req.params
    const {comment}=req.body
    
    const oldComment=await Comment.findById(commentId)

    if(!oldComment){
        throw new ApiError(500,"comment not found")
    }
   
    if(oldComment.owner.toString()!==req.user._id.toString()){
        throw new ApiError(400,"user does not match")
    }

    const updateComment=await Comment.findByIdAndUpdate(
        commentId,
        {$set :{
            content:comment
        }
    },{new:true})

    if(!updateComment){
        throw new ApiError(400,"comment not updated")
    }

    const newComment=await Comment.findById(commentId)

    res
    .status(200)
    .json(
       new ApiResponse(200,newComment,"added comment successfully")
    )
})

const deleteComment = asyncHandler(async (req, res) => {
    // TODO: delete a comment

    const {commentId}=req.params
    
    const comment=await Comment.findById(commentId)

    if(!comment){
        throw new ApiError(400,"comment not found")
    }

    if(comment.owner.toString()!==req.user._id.toString()){
        throw new ApiError(400,"user does not match")
    }

    const deleteComment=await Comment.findByIdAndDelete(commentId)

    res
    .status(200)
    .json(
        new ApiResponse(200,deleteComment,"comment deleted successfully")
    )

})

export {
    getVideoComments, 
    addComment, 
    updateComment,
     deleteComment
    }
