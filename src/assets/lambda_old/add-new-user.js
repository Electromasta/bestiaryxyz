'use strict';
const crypto = require('crypto');
const AWS = require('aws-sdk');
const ses = new AWS.SES({region: 'us-east-1'});
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

        if (result.Item)    {
            body = {error: "User Already Exists"};
            statusCode = 200;
        }   else {
            var salt = crypto.randomBytes(Math.ceil(4)).toString('hex').slice(0,8);
            var hash = crypto.createHmac('sha512', salt);
            hash.update(data.password);
            var saltedpw = hash.digest('hex');
            
            var verifyphrase = "I am a cute Kobold";
            
            const putparams = {
                TableName: "BestFriendTable",
                Item: {
                    key: "usr." + data.username,
                    table: "usr." + data.username + ".info",
                    name: data.username,
                    email: data.email,
                    verifyphrase: verifyphrase,
                    salt: salt,
                    saltpassword: saltedpw,
                    activated: false,
                    createdate: new Date().getTime(),
                    sessionDate: new Date().getTime(),
                    sessionToken: "",
                    weight: 0
                }
            };
            
            var params = {
                Destination: {
                    ToAddresses: [data.email]
                },
                Message: {
                    Body: { Text: { Data: "Confirmation code for Account Activation: " + verifyphrase } },
                    Subject: { Data: "Eastmarches Sign Up" }
                },
                Source: "noreply@eastmarches.com"
            };
        
            
            var test = await ses.sendEmail(params).promise();
            
            console.log(test);
    
            await doc.put(putparams).promise();
            statusCode = 200;
            body = JSON.stringify({"result": "success"});
        }
        
    } catch (e) { console.log(e); }
    
    return {
        statusCode: statusCode,
        headers: headers,
        body: body
    };
};
