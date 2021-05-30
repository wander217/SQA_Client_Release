import axios from "axios";

const BaseUrl = "http://localhost:8080/subjectgroup/";
const RegisterUrl = "http://localhost:8080/registration/"

function getSessionAccount(){
    const accountJson = sessionStorage.getItem("account");
    if(accountJson){
        return JSON.parse(accountJson);
    }
    return null;
}

async function getBySubject(termSubjectId,pageNum,recordPerPage,properties,order,searchType,searchData){
    const account = getSessionAccount();
    if(account === null) return [];
    const data= {termSubjectId,pageNum,recordPerPage,properties,order,searchType,searchData}; 
    var basicAuth = 'Basic ' + btoa(account.username + ':' + account.password);
    try{
        const response = await axios.post(BaseUrl+"tsfind",data,{
            headers:{
                'Content-Type': 'application/json',
                'Authorization': basicAuth
            }
        });
        return response.data;
    }catch(err){
        console.log(err);
        return [];
    }
}

async function getAllCheckedItem(data){
    const account = getSessionAccount();
    if(account === null) return [];
    var basicAuth = 'Basic ' + btoa(account.username + ':' + account.password);
    try{
        const response = await axios.post(RegisterUrl+"tsfind",data,{
            headers:{
                'Content-Type': 'application/json',
                'Authorization': basicAuth
            }
        });
        return response.data;
    }catch(err){
        console.log(err);
        return [];
    }
}


async function doRegister(data){
    const account = getSessionAccount();
    if(account === null) return [];
    var basicAuth = 'Basic ' + btoa(account.username + ':' + account.password);
    const path = account.role.name==="TEACHER"?"teacherreg":"adminreg";
    const response = await axios.post(RegisterUrl+path,data,{
        headers:{
            'Content-Type': 'application/json',
            'Authorization': basicAuth
        }
    });
    return response;
}

export const GroupApi = {
    getBySubject,getAllCheckedItem,doRegister
}