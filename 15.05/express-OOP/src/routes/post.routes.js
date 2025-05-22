// import express from 'express';
// import { PostController } from '../controllers/post.controller.js';

// export class UserRoutes {
//   constructor() {
//     this.router = express.Router();
//     this.postController = new PostController();
//     this.initializeRoutes();
//   }

//   initializeRoutes() {
//     this.router.get('/', (req, res) => this.userController.getUsers(req, res));
//     this.router.get('/:id', (req, res) => this.userController.getUserById(req, res));
//     this.router.post('/', (req, res) => this.userController.createUser(req, res));
//     this.router.put('/:id', (req, res) => this.userController.updateUser(req, res));
//     this.router.delete('/:id', (req, res) => this.userController.deleteUser(req, res));
//   }

//   getRouter() {
//     return this.router;
//   }
// } 