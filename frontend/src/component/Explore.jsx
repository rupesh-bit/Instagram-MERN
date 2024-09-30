import { useState ,useEffect} from "react";

import service from '../Appwrite/posts'
import Photo from "./Photo";
import {useDispatch, useSelector} from 'react-redux'
import { storepost,rtest} from "../redux/data";


export default function Explor(params) {
    
    const user=useSelector(state=>state.auth);
    const dispatch=useDispatch()
    const posts=user.posts
     useEffect(()=>{
        if (!user.posts){
            service.getPosts()
           .then((file)=> {
            if(file) {
                let posts=file.data
              //dispatch(rtest({mypost}))
                dispatch(storepost({posts}))// dispatch(login({userData}))
              
            }})
         }
        
       },[])
 

    return (<>
   <div className="w-full px-1 pt-2 min-h-screen bg-black ">
          
   
        <div className="w-full lg:w-11/12 xl:w-9/12  grid grid-cols-3 gap-1 mx-auto ">
            {posts? posts.map((post)=>
             {return(<Photo key={post._id} {...post}/>
             )})
             :null} 
         </div>
         <div className="h-12 md:hidden bg-slate-100"></div>
   </div>
    </>)
    
}//


