import axios from "axios";

const BaseUrl = "http://localhost:8080/account/forgot";

async function doForgot(data){
    try{
        let account = {
            username:data.username
        }
        const response = await axios.post(BaseUrl,account);
        console.log(response);
        return response;
    }catch(error){
        console.log(error);
        return {data:null};
    }
}

export const ForgotApi ={
    doForgot
}