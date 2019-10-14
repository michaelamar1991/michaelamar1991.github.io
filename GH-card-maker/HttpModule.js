class HttpModule{
    constructor(){}
    get(url){
        return new Promise(function(resolve,reject){
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.send();
        
            xhr.addEventListener('readystatechange',processRequest,false);
            xhr.onreadystatechange = processRequest;
        
            function processRequest(e){
                if(xhr.readyState == 4 && xhr.status == 200){
                    resolve(JSON.parse(xhr.responseText));
                }else if(xhr.readyState == 4 && xhr.status !=200){
                    reject(xhr);
                }
            }
        })
    }

    post(url,data){
        return new Promise(function(resolve,reject){
            let xhr = new XMLHttpRequest();
            xhr.open('POST', url, true);
            xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
            let jsonData = JSON.stringify(data);
            xhr.addEventListener('readystatechange',processRequest,false);
            xhr.onreadystatechange = processRequest;
        
            function processRequest(e){
                if(xhr.readyState == 4 && xhr.status == 200){
                    resolve(JSON.parse(xhr.responseText));
                }else if(xhr.readyState == 4 && xhr.status !=200){
                    reject(xhr);
                }
            }

            xhr.send(jsonData);

        })
    }
}