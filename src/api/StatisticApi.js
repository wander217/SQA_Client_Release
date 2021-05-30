import axios from "axios";

const BaseUrl = "http://localhost:8080/termsubject/";

function getSessionAccount(){
    const accountJson = sessionStorage.getItem("account");
    if(accountJson){
        return JSON.parse(accountJson);
    }
    return null;
}

async function getAll(pageNum,recordPerPage,properties,order,searchType,searchData){
    const account = getSessionAccount();
    if(account === null) return [];
    const data= {pageNum,recordPerPage,properties,order,searchType,searchData}; 
    var basicAuth = 'Basic ' + btoa(account.username + ':' + account.password);
    try{
        const response = await axios.post(BaseUrl+"all",data,{
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

export const StatisticApi = {
    getAll
}