import fetch from 'node-fetch';
import keycloak  from './keycloak.js';

export const setupAuth = (app, routes) => {   
    routes.forEach(r => {
        if (r.auth) {
            app.use(r.url, verifyTokenWithKeycloak, function (req, res, next) {                
                next();
            });
        }
    });  

    app.get('/test', verifyTokenWithKeycloak ,(req, res) => {
        res.send('Test');
      });
}

function verifyTokenWithKeycloak (req, res, next){
    if(req.get('Authorization')){
        return res.sendStatus(401);
    }

    const accessToken = req.get('Authorization').split(' ')[1];
    console.log(accessToken);

    //user introspect
    //const url = 'http://localhost:8080/realms/microserviceTut/protocol/openid-connect/token/introspect';
    
    const options = {
        method: "POST",
        headers: {
            Accept: "*/*",
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            token: accessToken,
            client_id: keycloak.client,   //'microserviceGateway',
            client_secret: keycloak.secret, //'S4SsTiF3Qq0bcQ0ShTkpiEJ1KPDnPjZi'
        })
    };

    fetch(keycloak.introspectUrl, options)
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        if(data.active){
            next();
        } else {
            return res.sendStatus(401);
        }                
    });    
}

