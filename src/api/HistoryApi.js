import axios from "axios";

const BaseUrl = "http://localhost:8080/teacher/"

function getSessionAccount(){
    const accountJson = sessionStorage.getItem("account");
    if(accountJson){
        return JSON.parse(accountJson);
    }
    return null;
}

async function getByTeacher(teacherId,pageNum,recordPerPage,properties,order,searchType,searchData){
    const account = getSessionAccount();
    if(account === null) return [];
    const data= {teacherId,pageNum,recordPerPage,properties,order,searchType,searchData}; 
    var basicAuth = 'Basic ' + btoa(account.username + ':' + account.password);
    try{
        const response = await axios.post(BaseUrl+"history",data,{
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


export const HistoryApi = {
    getByTeacher
}