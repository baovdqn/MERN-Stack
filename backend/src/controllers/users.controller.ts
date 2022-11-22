import express, { Request, Response } from 'express';
import mongoose from 'mongoose';

const postSignIn = (req: any, res: any) => {
  const username = req.body.username;
  const password = req.body.password
  res.status(200).json({
    username,
    password
  })
}

export {
  postSignIn
}