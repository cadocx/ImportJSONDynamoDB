//Import data to DynamoDB, needs prior AWS configuration
const jsonfile = require('jsonfile');
const AWS = require('aws-sdk');
AWS.config.update({
    region: "us-east-1"
});
 
const docClient = new AWS.DynamoDB.DocumentClient();
const jsonFile = "example.json";
const objects = jsonfile.readFileSync(jsonFile);
 
 
function inserDataIntoDynamoDbTable(index){
    if(index===objects.length){
        console.log("Finished writing");
        return;
    }
    const params = {
        TableName: "ExampleTableName",
        Item: objects[index]
    };

    docClient.put(params, function(err, data) {
        if (err) {
            console.log("error saving object to database" ,err);
        }else{
            console.log(`Item ${objects[index]} has been saved succesfully at index ${index}`);
            index++;
            setTimeout(function(){
                inserDataIntoDynamoDbTable(index);
            }, 300);
        }
    });
}
 
inserDataIntoDynamoDbTable(0);