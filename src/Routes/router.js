import {
    createBrowserRouter
} from "react-router-dom";
import Register from "../Components/Auth//Register.jsx";
import Login from "../Components/Auth/Login.jsx";
import User from "../Components/User";

const router = createBrowserRouter(
    [

        {
            path: "/",
            element: <Register/>
        },
        {
            path: "/login",
            element: <Login/>
        }, {
            path: "/user/:id",
            element: <User/>
        }

    ]




)

export default router