import { Request, Response } from "express";
import asyncHandler from "../middleware/async";
import { BadRequestDataResponse, CreatedResponse, SuccessResponse } from "../core/ApiResponse";
import { Input } from "../interfaces/directory.interfaces";
import { BadRequestDataError } from "../core/ApiError";
const {
  createDirectory,
  getDirectories,
  deleteDirectory,
  getItemsByDirectory,
} = require("../database/directory.database");

exports.create = asyncHandler(async (req: Request, res: Response) => {
  const payload: Input = req.body;
  if(!payload.name){
    throw new BadRequestDataError("title is needed", [])
  }
  payload.created = Date.now();
  // use random number as id
  payload.id = Date.now();
  const newDirectory = await createDirectory({
    id: payload.id,
    created: payload.created,
    name: payload.name,
  });

  return new CreatedResponse("Success", newDirectory).send(res);
});

exports.list = asyncHandler(async (req: Request, res: Response) => {
  const count: number = parseInt(req.query.page as string) * 5 || 5;
  const newDirectory = await getDirectories(count);

  return new SuccessResponse("Success", newDirectory).send(res);
});

exports.remove = asyncHandler(async (req: Request, res: Response) => {
  const id: number = parseInt(req.body.id);
  if(!id){
    throw new BadRequestDataError("Id is required", [])
  }
  const items = await getItemsByDirectory(id);
  await deleteDirectory(id, items.Items);
  return new SuccessResponse("Success", []).send(res);
});
