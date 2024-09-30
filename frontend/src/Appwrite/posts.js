import axios from "axios";
export class Service{
    
    async createPost({title, content, featuredImage, status, userId}){
        try {
            const url ="http://localhost:8000/api/v1/photos"
            const response =await axios.post(url,{
             withCredentials: true 
             })
            console.log(response.data)
            return response.data
           
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            const url ="http://localhost:8000/api/v1/photos/:photoId"
            const response =await axios.get(url,{
             withCredentials: true 
             })
            console.log(response.data)
            return response.data
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
        }
    }

    async deletePost(slug){
        try {
            const url ="http://localhost:8000/api/v1/photos/:photoId"
            const response =await axios.get(url,{
             withCredentials: true 
             })
            console.log(response.data)
            return response.data
            
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false
        }
    }

    async getPost(slug){
        try {
            const url ="http://localhost:8000/api/v1/photos/:photoId"
            const response =await axios.get(url,{
             withCredentials: true 
             })
            console.log(response.data)
            return response.data
     
                 
           
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }

    async getPosts(){
        try {
            const url ="http://localhost:8000/api/v1/photos"
            const params = {
                limit:'15'
              };
            const response =await axios.get(url,  { 
              params: { limit:'15' } ,
                withCredentials: true     
               }
                )
            console.log(response.data)
            return response.data
           
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

    // file upload service


    async uploadFile(file){
        try {
           
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
          
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId){
       
    }
}


const service = new Service()
export default service
