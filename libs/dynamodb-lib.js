import AWS from "aws-sdk";

AWS.configure.update({region: "us-east-2"});

export function call(action, params) {
  const dynamodb = AWS.DynamoDB.DocumentClient();

  return dynamodb[action](params).promise();
}
