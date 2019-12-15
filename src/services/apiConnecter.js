const URL = "http://localhost:8080";
const headers = {
    "Content-Type": "application/json"
}

const callFetch = (url,method="GET",body)=>{
    if(!!body){
        return fetch(`${URL}${url}`,{
            headers,
            method:method,
            body
        })
        .then(res=>res.json())
        .catch(err=>err)
    }else{
        return fetch(`${URL}${url}`,{
            headers,
            method:method
        })
        .then(res=>res.json())
        .catch(err=>err)
    }
    
}

module.exports = {
    getAllShops :()=>{
        return callFetch("/shops");
    }
}