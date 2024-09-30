import mongoose, {isValidObjectId} from "mongoose"
import {Photo} from "../models/photos.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {uploadOnCloudinary, deleteFromCloudinary} from "../utils/cloudinary.js"


const getAllPhotos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
    console.log(req.query)
    //TODO: get all videos based on query, sort, pagination
    const skip=(page-1)*limit

    const photos=await Photo.aggregate(
      [
        { $sort: { createdAt: -1 } },     // Sorting stage
        { $skip:Number(skip)  },                  // Pagination - Skip documents
        { $limit: Number( limit) } , 

         {$lookup: {
             from: 'users',
             localField: 'owner',
             foreignField: '_id',
            as: 'user'
        }},

         { $unwind: '$user'},

       {$project: {
            photo:1,
            createdAt:1,
            'user.avatar':1,
            "user.username":1,
           'user._id':1
        }}

     ])

     if(!photos){
      throw new ApiError(500,"can't get photo from DB")
     }

     res
     .status(200)
     .json(
      new ApiResponse(200,photos,"photos get suseccfully")
     )

})

const publishAPhoto = asyncHandler(async (req, res) => {
    const { title} = req.body

    // TODO: get video, upload to cloudinary, create video

       if(!title){
        throw new ApiError(404, "some frontend field is emty")
       }
        
        
          const thumbnailPath=req.file?.path
            console.log(req.file)
          if( !thumbnailPath){
            throw new ApiError(500, "vedio or thumbnail not provided")
          }

        
          const thumbnail=await uploadOnCloudinary(thumbnailPath)

          if( !thumbnail){
            throw new ApiError(500,"not uploded on cloudinary")
          }

         console.log(thumbnail)

         const vedio= await Photo.create({
          photo:thumbnail.url,
          title,
          owner:req.user._id
         })
             
         const createdvedio= await Photo.findById(vedio._id)

         if(!createdvedio){
           throw new ApiError(505,"vidio not created")
         }

    return res 
    .status(200)
    .json(
        new ApiResponse (200,createdvedio, "vedio uploded sccusecfull")
     )

})

const getPhotoById = asyncHandler(async (req, res) => {
    const { photoId } = req.params

    //TODO: get video by id
      if(!photoId){
       throw new ApiError(500,"videoid have no value")
      }

    const video =await Photo.findById(photoId)

    if(!video){
        throw new ApiError(500,"video not avaliable in database")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200,video,"found video successfully")
    )

})

const updatePhoto = asyncHandler(async (req, res) => {
    const { photoId } = req.params
    //TODO: update video details like title, description, thumbnail

    const thumbnailPath=req.file?.path
           console.log(thumbnailPath)

           
    const {title,thumbnail}=req.body

    if(!title ){
      throw new ApiError(400,"any field must not be empty")
    }

    const photo=await Photo.findById(photoId)
    
    if(!photo){
      throw new ApiError(500,"whould not find video in database")
    }

    if(thumbnailPath){
      //deleting old thumbnail
      const url=photo.photo

      const spliturl=url.split('/')
      const publicId=spliturl[spliturl.length-1].split('.')[0]
      console.log(publicId)
       
     const deleteResponse=await deleteFromCloudinary(publicId)

     if(!deleteResponse){
         throw new ApiError(400,"error in delition")
     }

     const newThumbnail =await uploadOnCloudinary(thumbnailPath)

     photo.photo=newThumbnail.url
           }

    if(photo.title!==title){
      photo.title=title
    }

   

    await photo.save({validateBeforeSave: false})

    const updatedvideo=await Photo.findById(photoId)

      
    return res 
    .status(202)
    .json(
      new ApiResponse( 200,updatedvideo ,"susfully") )



})

const deletePhoto = asyncHandler(async (req, res) => {
    const { photoId } = req.params


     const video =await Photo.findById(photoId)

     

    //deleting thumbnail
    const thumbnailurl=video.photo

    const splitUrl=thumbnailurl.split('/')
    const PublicId=splitUrl[splitUrl.length-1].split('.')[0]
    console.log(PublicId)
     
   const deleteresponse=await deleteFromCloudinary(PublicId)

   if(!deleteresponse){
       throw new ApiError(400,"error in delition")
   }

   const response=await Photo.deleteOne({_id:photoId})

   res
   .status(200)
   .json(
    new ApiResponse(200,response,"video sucessfully deleted")
   )





})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { photoId } = req.params
})

export {
    getAllPhotos,
    publishAPhoto,
    getPhotoById,
    updatePhoto,
    deletePhoto,
    togglePublishStatus
}
