'use strict';
const crypto = require('crypto');
const AWS = require('aws-sdk');
const doc = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});

AWS.config.update({region: 'us-east-1'});

exports.handler = async (event, context) => {
    let body;
    let statusCode = 400;
    let headers = { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" };
    let data = JSON.parse(event.body);
    
    try {
        const getparams = {
            TableName: "BestFriendTable",
            Key: {
                key: "usr." + data.username,
                table: "usr." + data.username + ".info"
            }
        };
        
        var result = await doc.get(getparams).promise();
        
        if (result.Item && result.Item.activated)    {
            var hash = crypto.createHmac('sha512', result.Item.salt);
            hash.update(data.password);
            var saltedpw = hash.digest('hex');
            
            if (saltedpw === result.Item.saltpassword)  {
                var token = crypto.randomBytes(Math.ceil(4)).toString('hex').slice(0,8);
                
                const putparams = {
                    TableName: "BestFriendTable",
                    Item: {
                        key: result.Item.key,
                        table: result.Item.table,
                        name: result.Item.name,
                        email: result.Item.email,
                        verifyphrase: result.Item.verifyphrase,
                        salt: result.Item.salt,
                        saltpassword: result.Item.saltpassword,
                        activated: true,
                        createdate: result.Item.createdate,
                        sessionDate: new Date(new Date().getTime() + (60*60*1000)).getTime(),
                        sessionToken: token,
                        weight: 0
                    }
                };
                
                var result = await doc.put(putparams).promise();
                statusCode = 200;
                body = JSON.stringify({token: token});
            } else  {
                body = JSON.stringify({error: "Incorrect Password"});
                statusCode = 200;
            }
        }   else    {      
            body = JSON.stringify({error: "Incorrect Password"});
            statusCode = 200;
        }
    } catch (e) { console.log(e); }
    
    return {
        statusCode: statusCode,
        headers: headers,
        body: body
    };
}