import { PutItemOutput } from "aws-sdk/clients/dynamodb";
import { DocumentClient } from "aws-sdk/lib/dynamodb/document_client";
import { Input } from "../interfaces/todo.interfaces";


const AWS = require("aws-sdk")

AWS.config.update({
  region: process.env.AWS_REGION || "local",
  endpoint: process.env.AWS_ENDPOINT || "http://localhost:8000",
});

const dynamoClient: DocumentClient = new AWS.DynamoDB.DocumentClient();
const Todo: string = "todo";



const getTodos = async (count: number): Promise<PutItemOutput> => {
  const params = {
    TableName: Todo,
    "ScanIndexForward": false,
    Limit: count
  };
  const result = await dynamoClient.scan(params).promise();
  return result;
};

const getTodosFilter = async (count: number, filter:string, directoryId:number): Promise<PutItemOutput> => {

  const params = {
    TableName: Todo,
    "ScanIndexForward": false,
    FilterExpression : "#directoryId = :directoryId OR #done = :done",
    ExpressionAttributeNames: { "#directoryId": "directoryId", "#done": "done" },
    ExpressionAttributeValues: {
        ':done':JSON.parse(filter),
        ':directoryId': directoryId
    },
    Limit: count
  };
  const result = await dynamoClient.scan(params).promise();
  console.log(result)
  return result;
};

const getTodoById = async (id: string): Promise<PutItemOutput> => {
  const params = {
    TableName: Todo,
    Key: {
      id,
    },
  };
  return await dynamoClient.get(params).promise();
};

const deleteTodo = async (id: number) => {
  console.log(typeof id, id)
  const params = {
    TableName: Todo,
    Key: {
      id,
    },
  };
  return await dynamoClient.delete(params).promise()
};

const createTodo = async (character:Input): Promise<PutItemOutput> => {
  const params = {
    TableName: Todo,
    Item: character,
  };

  return await dynamoClient.put(params).promise();
};

const updateTodo = async (payload): Promise<PutItemOutput> => {
  const params = {
    TableName: Todo,
    Key: {
      "id": payload.id
  },
  UpdateExpression: "set done = :x",
  ExpressionAttributeValues: {
      ":x": payload.done,
  }
  };

  return await dynamoClient.update(params).promise();
};

const moveItem = async (payload): Promise<PutItemOutput> => {
  const params = {
    TableName: Todo,
    Key: {
      "id": payload.id
  },
  UpdateExpression: "set directoryId = :x",
  ExpressionAttributeValues: {
      ":x": payload.directoryId,
  }
  };

  return await dynamoClient.update(params).promise();
};


module.exports = {
  getTodos,
  getTodoById,
  deleteTodo,
  createTodo,
  updateTodo,
  getTodosFilter,
  moveItem

}