import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const { dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [ showPassword, setShowPassword ] = useState(false);

    const loginPost = async (user) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const userBody = JSON.stringify(user);

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: userBody
        };

        const resp = await fetch( import.meta.env.VITE_BACKEND_URL +  "/api/login", requestOptions)
        const data = await resp.json();
        if(!resp.ok) {
            toast.error(data.message, {
                icon: '🐍🫠'
            }); // muestra errores de backend
            return
        }
        toast.success("User Logged In");
        console.log(data);

        const token = data.access_token;

        localStorage.setItem("token", token); // guarda el token en el local storage

        dispatch({
            type: "set_token",
            payload: token
        });

        dispatch({
            type: "assign_user",
            payload: data
        });

        navigate("/");

        setEmail("");
        setPassword("");
    }

    const login = (email, password, ) => {
        if( !email || !password ) {
            toast.error("Please fill all the fields");
            return;
        }
        loginPost({
            email,
            password
        });
    }

    return <main className="form-signin w-100 m-auto
            d-flex justify-content-center align-items-center"
            style={{minHeight: "75vh"}}
        >
        <div className="col-6 mx-auto">
            <span className="text-start d-block mb-4 mt-2 ">
                <svg xmlns="http://www.w3.org/2000/svg" width="72" height="57" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zm0 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1z"/>
                    <path d="M8 4a2 2 0 1 1-1.117 3.648 2 2 0 0 1 2.234 0A2 2 0 0 1 8 4z"/>
                </svg>
            </span>
            <h1 className="h3 mb-3 fw-normal">Login</h1>

            <div className="form-floating">
                <input type="email" value={email || ""} onChange={ event => setEmail(event.target.value)}
                    className="form-control" placeholder="name@example.com"
                />
                <label for="floatingInput">Email address</label>
            </div>

            <div className="d-flex justify-content-between">
                <div className="form-floating col-11">
                    <input type={ showPassword ? "text" : "password" } className="form-control"  placeholder="Password"
                        value={password || ""} onChange={ event => setPassword(event.target.value)}
                    />
                    <label for="floatingPassword">Password</label>
                        
                </div>
                <button className="btn btn-light col-1" type="button"
                    onClick={ () => setShowPassword(!showPassword) }
                >
                    {
                        !showPassword ? "👁" : "🔒"
                    }
                </button>
            </div>

            <div className="form-check text-start my-3">
                <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault"/>
                <label className="form-check-label" for="flexCheckDefault">
                    Remember me
                </label>
            </div>
            <button className="btn btn-primary w-100 py-2"
                onClick={ () => login(email, password)}
            >
                Log In
            </button>
        </div>
    </main>
}


export default Login;