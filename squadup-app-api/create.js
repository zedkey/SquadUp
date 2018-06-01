import uuid form "uuid";
import aws from "aws-sdk";

AWS.config.update({region:"us-east-2"});
const dynamoDB = new AWS.DynamoDB.DocumentClient();

export function main(event, context, callback) {
  const data = JSON.parse(event.body);

  const params = {
    TableName: "SquadUpUsersPosts",
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      postId: uuid.v1(),
      content: data.content,
      createdAt: Date.now()
    }
  };

  dynamoDB.put(params, (error, data) => {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    };

    if (error) {
      const response = {
        statusCode: 500,
        headers: headers,
        body: JSON.stringify({status: false})
      };

      callback(null, response);
      return;
    } else {
      const response = {
        statusCode: 200,
        headers: headers,
        body: JSON.stringify(params.Item)
      };

      callback(null, response);
      return;
    }
  });
}
