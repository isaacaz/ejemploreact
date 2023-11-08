import { RouteObject } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/user";
import CreateUser from "../pages/user/create";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path: "form/:id?",
                element: <CreateUser />
            }
        ]
    },
]



const router = (isAuth: boolean = false) =>
    [
        {
            path: "",
            children: routes
        },
    ];

export default router