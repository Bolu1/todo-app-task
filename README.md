# todo-app-task
A task given to build a todo app with NodeJs and DynamoDB

For the documentation please refer to (https://documenter.getpostman.com/view/18378761/2s8YeiwbA4) 

## Dependencies

- [Node.js 14.17.5 or later](https://nodejs.org/en/)
- [Typescript 4.5.2 or later](https://www.typescriptlang.org/)

## Installation/Getting Started

First, clone the project:

```bash
git clone https://github.com/Bolu1/todo-app-task.git
```
Create two tables in Dynamodb named "directories" and "todo" with key index id

Start your DynamoDb serer:
```
docker run -p 8000:8000 amazon/dynamodb-local -jar DynamoDBLocal.jar -inMemory -sharedDb
```
DynamoDb now runs on [http://localhost:8000](http://localhost:8000).

CD into the project directory:

```bash
cd todo-app-task
```

Install dependencies:

```bash
npm install
# or
yarn
```

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Server now runs on [http://localhost:5000](http://localhost:5000).

API Docs [here](https://documenter.getpostman.com/view/18378761/2s8YeiwbA4)

<!-- ## Tests

**COMING SOON** -->
