import express from "express"
import cors from "cors"
import {
    loginUser,
    logoutUser,
    recoverPassword,
    registerUser,
    resetPassword,
    verifyOTP
} from "./controllers/user.controllers.js"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.static("public"))
app.use(express.json());

//routes








//routes import
import userRouter from './routes/user.routes.js'
import productRouter from "./routes/product.routes.js"
import cartRouter from "./routes/cart.routes.js"

app.route("/api/v1/register").post(registerUser);
app.route("/api/v1/login").post(loginUser);
app.route("/api/v1/logout").post(logoutUser);
// resetPass (user will enter email) -> verifyOTP (user will enter correct OTP) -> newPass (user will enter newPass and confirmPass)
app.route("/api/v1/reset-password").post(resetPassword);
app.route("/api/v1/verify-otp").post(verifyOTP);
// after verifying OTP user will be accessable to enter his new password
app.route("/api/v1/recover-password").post(recoverPassword);

//routes declaration
app.use("/api/v1/users", userRouter) // http://localhost:8000/api/v1/users
app.use("/api/v1/products", productRouter) // http://localhost:8000/api/v1/products
app.use("/api/v1/cart", cartRouter) // http://localhost:8000/api/v1/cart









// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});


export { app };