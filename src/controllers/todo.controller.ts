import { Request, Response } from "express";
import asyncHandler from "../middleware/async";
import { BadRequestDataResponse, CreatedResponse, SuccessResponse } from "../core/ApiResponse";
import { Input } from "../interfaces/todo.interfaces";
import { BadRequestDataError } from "../core/ApiError";
const {
  createTodo,
  getTodos,
  deleteTodo,
  updateTodo,
  moveItem,
  getTodosFilter,
} = require("../database/todo.database");

exports.create = asyncHandler(async (req: Request, res: Response) => {
  const payload: Input = req.body;
  if(!payload.title){
    throw new BadRequestDataError("title is needed", [])
  }
  payload.created = Date.now();
  payload.done = false;
  if (!payload.directoryId) {
    payload.directoryId = 0;
  }
  // use random number as id
  payload.id = Date.now();
  const response = await createTodo({
    id: payload.id,
    title: payload.title,
    created: payload.created,
    directoryId: payload.directoryId,
    done: payload.done,
  });

  return new CreatedResponse("Success", response).send(res);
});

exports.list = asyncHandler(async (req: Request, res: Response) => {
  const count: number = parseInt(req.query.page as string) * 5 || 5;
  if (req.query.directory != undefined || req.query.done != undefined) {
    console.log("here");
    const directory: number = parseInt(req.query.directory as string) || 0;
    const done = req.query.done ? req.query.done : "0";
    const response = await getTodosFilter(count, done, directory);
    return new SuccessResponse("Success", response).send(res);
  } else {
    const response = await getTodos(count);
    return new SuccessResponse("Success", response).send(res);
  }
});

exports.remove = asyncHandler(async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  if(!id){
    throw new BadRequestDataError("check your input", [])
  }
  const response = await deleteTodo(id);

  return new SuccessResponse("Success", response).send(res);
});

exports.markAsDone = asyncHandler(async (req: Request, res: Response) => {
  const id: number = req.body.id;
  if(!id){
    throw new BadRequestDataError("check your input", [])
  }
  const response = await updateTodo({ id: id, done: true });

  return new SuccessResponse("Success", response).send(res);
});

exports.markAsNotDone = asyncHandler(async (req: Request, res: Response) => {
  const id: number = req.body.id;
  if(!id){
    throw new BadRequestDataError("check your input", [])
  }
  const response = await updateTodo({ id: id, done: false });

  return new SuccessResponse("Success", response).send(res);
});

exports.moveToDirectory = asyncHandler(async (req: Request, res: Response) => {
  const id: number = req.body.id;
  const directoryId: number = req.body.directoryId;
  if(!id || !directoryId){
    throw new BadRequestDataError("check your input", [])
  }
  const response = await moveItem({ id: id, directoryId: directoryId });

  return new SuccessResponse("Success", response).send(res);
});
