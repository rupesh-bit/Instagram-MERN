import axios from 'axios'

export class AuthService {
   

    async createAccount(formdata) {//{email, password, username,image,fullName}
        try { for (let pair of formdata.entries()) {
            console.log(pair[0], pair[1]);
          }
            const url = 'http://localhost:8000/api/v1/users/register';
               console.log(image)
               
            const response = await axios.post(url,formdata, {
                headers: {
                    'Content-Type': 'multipart/form-data',
               },
                 withCredentials: true, // If you need to send cooki
            });
            console.log(response.data)
            return response.data
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}) {
          try {
            const url = 'http://localhost:8000/api/v1/users/login';
        
            const response = await axios.post(url, {
                email: email,
                password: password
            },{
                withCredentials: true 
            } ,{
                headers: {
                    'Content-Type': 'application/json'
                }
            } );
            console.log(response.data)
            return response.data

           } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {

       const url ="http://localhost:8000/api/v1/users/current-user"
       const response =await axios.get(url,{
        withCredentials: true 
        })
       console.log(response.data)
       return response.data

            
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout() {   
        try {
            const url=" http://localhost:8000/api/v1/users/logout"
         const response =await axios.post(url,{},{
            withCredentials: true 
            })

       console.log(response.data)
       return response.data
    
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}

const authService = new AuthService();
//export const Acc=new AuthService().account;
export default authService


