import axios from "axios";

const BaseUrl = "http://localhost:8080/account/login";

function getLocalAccount(){
    const accountJson = localStorage.getItem("account");
    if(accountJson){
        const account= JSON.parse(accountJson);
        return {
            username:account.username,
            password:account.password,
            remember:account.remember
        }
    }
    return null;
}

function getSessionAccount(){
    const accountJson = sessionStorage.getItem("account");
    if(accountJson){
        return JSON.parse(accountJson);
    }
    return null;
}

async function autoLogin(){
    let account = getSessionAccount();
    if(account === null){
        return null;
    }
    try{
        const response = await axios.post(BaseUrl,account);
        const roleName =response.data.role.name
        if(roleName==="ADMIN"||roleName==="EMPLOYEE"){
            return "admin";
        }
        if(roleName==="TEACHER"){
            return "teacher";
        }
        return null;
    }catch(error){
        console.log(error);
        return null;
    }
}

async function doLogin(data){
    try{
        let account = {
            username:data.username,
            password:data.password
        }
        const response = await axios.post(BaseUrl,account);
        return response;
    }catch(error){
        console.log(error);
        return {data:null};
    }
}

export const LoginApi ={
    getLocalAccount,
    getSessionAccount,
    autoLogin,doLogin
}