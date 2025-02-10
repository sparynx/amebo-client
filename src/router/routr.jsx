import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import App from '../App';
import Home from '../pages/Home';
import Categories from '../pages/Categories';
import About from '../pages/About';
import Explore from '../pages/Explore';
import Login from '../components/Login';
import Register from '../components/Register';
import CreateNewPost from '../pages/CreateNewPost';
import SinglePost from '../pages/SinglePost';
import ProtectedRoute from './ProtectedRoute';
import ProfilePage from '../pages/Profile';
import AdminRoutes from './AdminRoutes';
import Dashboard from '../pages/Dashboard';
import AdminLogin from '../components/AdminLogin';
import Contact from '../pages/Contact';
import Privacypolicy from '../pages/Privacypolicy';
import Terma from '../pages/Terma';
import Notfound from '../components/Notfound';



const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/categories",
                element: <Categories/>
            },
            {
                path: "/about",
                element: <About/>
            },
            {
                path: "/explore",
                element: <Explore/>
            },
            {
                path: "/login",
                element: <Login/>
            },
            {
                path: "/register",
                element: <Register/>
            },
            {
                path: "/newblogs",
                element: <CreateNewPost/>
            },
            {
                path: "/post/:id",
                element: <ProtectedRoute><SinglePost/></ProtectedRoute> 
            },
            {
                path: "/profile",
                element: <ProfilePage/>
            },
            {
                path: "/dashboard",
                element: <AdminRoutes><Dashboard/></AdminRoutes>
            },
            {
                path: "/admin",
                element :<AdminLogin/>
            },
            {
                path: "/contact",
                element: <Contact/>
            },
            {
                path: "/privacy-policy",
                element: <Privacypolicy/>
            },
            {
                path: "/terms-and-conditions",
                element: <Terma/>
            },

            {
                path: "*",
                element: <Notfound/>
            }
        ]
    }
]);


export default router;