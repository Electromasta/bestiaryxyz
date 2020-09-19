const AWS = require('aws-sdk');
const common = require('./common');

AWS.config.update({region: 'us-east-1'});

exports.handler = async (event, context) => {
    let body = "";
    let statusCode = 400;
    let seed = (event.pathParameters && event.pathParameters.seed) ? event.pathParameters.seed : new Date().getTime();
    let tier = (event.queryStringParameters && event.queryStringParameters.tier) ? event.queryStringParameters.tier : 1;
    let coinDistro = common.coins[tier-1];
        
    common.setseed(seed);
    
    try {
        var promises = [];
        var coins = [];
        var metadata = { "seed": seed, "coins": coins };
        
        coinDistro.forEach(async (e, i) => {
          var num = Math.floor(await common.rollDice(e[0], e[1])*(e[2]));
          coins.push(num);
        });
        
        promises.push(metadata);
        
        for (var i=0; i<await common.multiVarDistribution(0.95, 2); i++) {
            var dfour = await common.rollDice(1, 4);
            promises.push(await common.rollOnTable("gemmos" + tier + "." + dfour, tier-1, dfour-1));
        }
        
        for (var i=0; i<await common.multiVarDistribution(0.75, 2); i++) {
            promises.push(await common.rollOnTable("commonitems"));
        }
        
        for (var i=0; i<await common.multiVarDistribution(0.75, 4); i++) {
            promises.push(await common.rollOnTable("minoritems" + common.minorchars[tier]));
        }
        
        var tiersum = common.chancedrops[tier-1][0] + common.chancedrops[tier-1][1] + common.chancedrops[tier-1][2];
        for (var i=0; i<await common.multiVarDistribution(tiersum, 4); i++) {
            var picked = await common.random();
            if (picked < (common.chancedrops[tier-1][0]/tiersum))  {
                promises.push(await common.rollOnTable("majoritemsF"));
            } else if (picked < (common.chancedrops[tier-1][1]/tiersum))  {
                promises.push(await common.rollOnTable("majoritemsG"));
            }  else if (picked < (common.chancedrops[tier-1][2]/tiersum))  {
                promises.push(await common.rollOnTable("majoritemsH"));
            }
        }

        const data = await Promise.all(promises);
        statusCode = 200;
        console.log(data);
        body = JSON.stringify(data);
    } catch (e) { body = `Unable to get item: ${e}` }
    
    return {
        statusCode: statusCode,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
        body: body
    };
};
