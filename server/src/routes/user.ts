import express from "express";
import { deleteUser, getAllUsers, getUserDetails, getUsers, loginUser, logoutUser, registerUser, updateUser } from "../controllers/user.js";
import { adminOnly, isUserLogin, verifyToken } from "../middlewares/auth.js";
import { singleUpload } from "../middlewares/multer.js";

const app = express.Router();

app.get("/verify", verifyToken)
app.post("/register", registerUser);
app.post("/login", loginUser);
app.post("/logout", logoutUser);

app.get("/all", getAllUsers);
app.get('/details', isUserLogin, getUserDetails);

app.route('/:id')
.get(getUsers)
.put(singleUpload, updateUser)
.delete(adminOnly, deleteUser);

export default app;