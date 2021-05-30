import axios from "axios";

const BaseUrl = "http://localhost:8080/term/";

function getSessionAccount(){
    const accountJson = sessionStorage.getItem("account");
    if(accountJson){
        return JSON.parse(accountJson);
    }
    return null;
}

async function getLast(){
    const account = getSessionAccount();
    if(account === null) return null;
    var basicAuth = 'Basic ' + btoa(account.username + ':' + account.password);
    const response = await axios.get(BaseUrl+"last",{
        headers:{
            'Content-Type': 'application/json',
            'Authorization': basicAuth
        }
    });
    return response;
}

async function update(data){
    const account = getSessionAccount();
    if(account === null) return [];
    var basicAuth = 'Basic ' + btoa(account.username + ':' + account.password);
    const response = await axios.put(BaseUrl,data,{
        headers:{
            'Content-Type': 'application/json',
            'Authorization': basicAuth
        }
    });
    return response;
}

export const TermApi = {
    getLast,update
}