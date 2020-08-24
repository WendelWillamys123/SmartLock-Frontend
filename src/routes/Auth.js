import jwt from 'jsonwebtoken';

export const isAuthenticated =  () => {
    const secret = "8addf84452af7874ee280bc0869781c5";

    var authenticated = false;

    var data = sessionStorage.getItem("tokenLocal");
    var tokenLocal = JSON.parse(data);

    if(tokenLocal === null || tokenLocal === undefined) {
        authenticated = false;
        
    } else{
        jwt.verify(tokenLocal, secret, (err, decoded) => {
            if(err) authenticated = false;
            else {
                authenticated = true;
                sessionStorage.setItem("myID", JSON.stringify(decoded.id));
                sessionStorage.setItem("myIDAdmin", JSON.stringify(decoded.idAdmin));
            }
        }) 
    }

    return authenticated;
    
};