import axios from "axios";

const BaseUrl = "http://localhost:8080/teacher/";
const TermSubjectUrl = "http://localhost:8080/termsubject/"

function getSessionAccount(){
    const accountJson = sessionStorage.getItem("account");
    if(accountJson){
        return JSON.parse(accountJson);
    }
    return null;
}

async function getAllAssigned(termSubjectId,type,pageNum,recordPerPage,properties,order,searchType,searchData){
    const account = getSessionAccount();
    if(account === null) return [];
    const data= {termSubjectId,pageNum,recordPerPage,properties,order,searchType,searchData};
    var basicAuth = 'Basic ' + btoa(account.username + ':' + account.password);
    const path = type==="remember"?"rfind":"ffind";
    try{
        const response = await axios.post(TermSubjectUrl+path,data,{
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

async function getAllTeacher(fullname){
    const account = getSessionAccount();
    if(account === null) return [];
    var basicAuth = 'Basic ' + btoa(account.username + ':' + account.password);
    const data= {searchData:fullname};
    try{
        const response = await axios.post(BaseUrl+"registration",data,{
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

export const TeacherApi = {
    getAllTeacher,getAllAssigned
}