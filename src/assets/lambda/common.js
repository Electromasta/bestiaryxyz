const AWS = require('aws-sdk');
const doc = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});
var seed;

AWS.config.update({region: 'us-east-1'});

var coins = [
    [[6, 6, 100], [3, 6, 100], [2, 6, 10], [0, 0, 0], [0, 0, 0]],
    [[2, 6, 100], [2, 6, 1000], [6, 6, 100], [3, 6, 10], [0, 0, 0]],
    [[0, 0, 0], [0, 0, 0], [4, 6, 1000], [5, 6, 100], [0, 0, 0]],
    [[0, 0, 0], [0, 0, 0], [12, 6, 1000], [8, 6, 1000], [0, 0, 0]]
];

var gemvals = [
    [[2, 6, 10], [2, 6, 10], [2, 4, 25], [2, 6, 50]],
    [[2, 4, 25], [3, 6, 50], [3, 6, 100], [2, 4, 250]],
    [[2, 4, 250], [2, 4, 750], [3, 6, 500], [3, 6, 1000]],
    [[3, 6, 1000], [1, 10, 2500], [1, 4, 7500], [1, 8, 5000]]
];

var chancedrops = [ //out of 100
    [0.15, 0, 0],
    [0.25, 0.05, 0],
    [0.10, 0.25, 0.05],
    [0.10, 0.10, 0.25]
];

var minorchars = ["A", "B", "C", "D", "E"];
var majorchars = ["F", "G", "H"];

var query = function(map)   {
    const params = {
        TableName: "BestFriendTable",
        IndexName: "key-weight-index",
        Limit: 1,
        ScanIndexForward: (map.reverse && map.reverse==true) ? false : true,
        KeyConditionExpression: (map.weight) ? "#key = :key AND weight >= :weight" : "#key = :key",
        ExpressionAttributeNames: { "#key": "key" },
        ExpressionAttributeValues: (map.weight) ? {
            ":key": "itm." + ((map.type) ? map.type : "commonitems"),
            ":weight": map.weight
        } : {
            ":key": "itm." + ((map.type) ? map.type : "commonitems")
        }
    };
    
    return doc.query(params).promise();
};

var rollOnTable = async function(table, tier, dfour)   {
    var result = "";
    var weight = 0;
    
    try{
        const test = await query({type: table, reverse: true});
        weight = test.Items[0]["weight"];
    } catch (e) { result = `Unable to get maxweight: ${e}` }
    
    try{
        const data = await query({type: table, weight: Math.floor(random() * weight)});
        result = data.Items[0];
    } catch (e) { result = `Unable to get item: ${e}` }
    
    console.log("tier: " + tier);
    console.log("dfour: " + dfour);
    if (tier !== undefined && dfour !== undefined) {
        var roll = await rollDice(gemvals[tier][dfour][0], gemvals[tier][dfour][1]);
        result.name = roll  + " " + result.name + " worth " + gemvals[tier][dfour][2] + " each";
    }
        
    
    return result;
};

var rollDice = function(dice, faces)  {
    var total = 0;
    for (var i=0; i<dice; i++) 
      total += Math.ceil(random() * faces);
    return total;
};

var multiVarDistribution = function(baseChance, face) {
    return (random() < baseChance) ? rollDice(1, face) : 0;
};

var setseed = function(s)   {
    seed = s;
};

var random = function()  {
    seed ^= seed << 21;
    seed ^= seed >>> 35;
    seed ^= seed << 4;
    seed = Math.abs(seed)%1000000000;
    return seed/1000000000;
};

module.exports = {
    coins: coins,
    gemvals: gemvals,
    chancedrops: chancedrops,
    minorchars: minorchars,
    majorchars: majorchars,
    query: query,
    rollOnTable: rollOnTable,
    rollDice: rollDice,
    multiVarDistribution: multiVarDistribution,
    setseed: setseed,
    random: random
};