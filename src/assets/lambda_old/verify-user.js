'use strict';
const crypto = require('crypto');
const AWS = require('aws-sdk');
const doc = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});

AWS.config.update({region: 'us-east-1'});

exports.handler = async (event, context) => {
    let body = {error: "Server Error"};
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
        
        if (result.Item && data.verifyphrase === result.Item.verifyphrase)    {
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
                    sessionDate: result.Item.sessionDate,
                    sessionToken: result.Item.sessionToken,
                    weight: 0
                }
            };
            
            var result = await doc.put(putparams).promise();
            statusCode = 200;
            body = JSON.stringify({success: "Success!"});
        }   else    {      
            body = JSON.stringify({error: "User Doesn't Exist or Phrase is Wrong"});
            statusCode = 200;
        }
    } catch (e) { console.log(e); }
    
    return {
        statusCode: statusCode,
        headers: headers,
        body: body
    };
}