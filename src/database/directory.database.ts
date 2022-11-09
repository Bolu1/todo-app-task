import { PutItemOutput } from "aws-sdk/clients/dynamodb";
import { DocumentClient } from "aws-sdk/lib/dynamodb/document_client";

const AWS = require("aws-sdk")

AWS.config.update({
  region: process.env.AWS_REGION || "local",
  endpoint: process.env.AWS_ENDPOINT || "http://localhost:8000",
});

const dynamoClient: DocumentClient = new AWS.DynamoDB.DocumentClient();
const Todo: string = "directories";

const getDirectories = async (count: number): Promise<PutItemOutput> => {
  const params = {
    TableName: Todo,
    "ScanIndexForward": false,
    Limit: count
  };
  const characters = await dynamoClient.scan(params).promise();
  return characters;
};

const getDirectoryById = async (id: string): Promise<PutItemOutput> => {
  const params = {
    TableName: Todo,
    Key: {
      id,
    },
  };
  return await dynamoClient.get(params).promise();
};

const deleteDirectory = async (id: number, items:[any]) => {
  const params = {
    TableName: Todo,
    Key: {
      id,
    },
  };

  console.log(items)
  // delete all todo items under the directory
  for(let i = 0; i <items.length; i++){

    const params1 = {
      TableName: "todo",
      Key: {
        "id": items[i].id,
      },
    };
   await dynamoClient.delete(params1).promise()

  }

   await dynamoClient.delete(params).promise()
};

const createDirectory = async (character): Promise<PutItemOutput> => {
  const params = {
    TableName: Todo,
    Item: character,
  };

  return await dynamoClient.put(params).promise();
};

const updateDirectory = async (character): Promise<PutItemOutput> => {
  const params = {
    TableName: Todo,
    Item: character,
  };

  return await dynamoClient.put(params).promise();
};

const getItemsByDirectory = async (id: number): Promise<PutItemOutput> => {
  const params = {
    TableName: "todo",
    FilterExpression : "#directoryId = :directoryId",
    ExpressionAttributeNames: { "#directoryId": "directoryId" },
    ExpressionAttributeValues: {
        ':directoryId':id
    }
  };

  const items = await dynamoClient.scan(params).promise();
  return items
};


module.exports = {
  getDirectories,
  getDirectoryById,
  deleteDirectory,
  createDirectory,
  updateDirectory,
  getItemsByDirectory
}