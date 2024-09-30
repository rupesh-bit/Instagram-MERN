import { Link } from "react-router-dom"
import service from "../Appwrite/posts"


export default function Photo({photo,user}) {



return (<>
<div className={`w-full h-40 md:h-60 lg:h-80  overflow-hidden`} >
    <Link  to={`/post/`} >
    <img className="object-center object-cover h-full w-full"
     src={photo} alt='photo'/>
     </Link>
    <label>photo
    </label>
</div>
</>)
}

//








