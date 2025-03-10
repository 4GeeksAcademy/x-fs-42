import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";

const Singup = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [ username, setUsername ] = useState("");

    const [ showPassword, setShowPassword ] = useState(false);
    const [ showConfirmPassword, setShowConfirmPassword ] = useState(false);

    const userPost = async (newUser) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const userBody = JSON.stringify(newUser);

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: userBody
        };

        const resp = await fetch( import.meta.env.VITE_BACKEND_URL +  "/api/users", requestOptions)
        const data = await resp.json();
        if(!resp.ok) {
            toast.error(data.message);
            return
        }
        toast.success("User registered");
        console.log(data);
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setUsername("");
    }

    const register = (email, username, password, confirmPassword) => {
        if( !email || !password || !confirmPassword || !username ) {
            toast.error("Please fill all the fields");
            return;
        }
        if( password !== confirmPassword ) {
            toast.error("Passwords do not match");
            return;
        }
        userPost({
            email,
            password,
            username
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
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

            <div className="form-floating">
                <input type="email" value={email || ""} onChange={ event => setEmail(event.target.value)}
                    className="form-control" placeholder="name@example.com"
                />
                <label htmlFor="floatingInput">Email address</label>
            </div>

            <div className="form-floating">
                <input type="text" value={username || ""} onChange={ event => setUsername(event.target.value)}
                    className="form-control" placeholder="your username"
                />
                <label htmlFor="floatingInput">Username</label>
            </div>

            <div className="d-flex justify-content-between">
                <div className="form-floating col-11">
                    <input type={ showPassword ? "text" : "password" } className="form-control"  placeholder="Password"
                        value={password || ""} onChange={ event => setPassword(event.target.value)}
                    />
                    <label htmlFor="floatingPassword">Password</label>
                        
                </div>
                <button className="btn btn-light col-1" type="button"
                    onClick={ () => setShowPassword(!showPassword) }
                >
                    {
                        !showPassword ? "👁" : "🔒"
                    }
                </button>
            </div>

            <div className="d-flex justify-content-between">
                <div className="form-floating col-11">
                    <input type={ showConfirmPassword ? "text" : "password" } className="form-control"  placeholder="Confirm Password"
                        value={confirmPassword || ""} onChange={ event => setConfirmPassword(event.target.value)}
                    />
                    <label htmlFor="floatingPassword">Confirm Password</label>
                </div>
                <button className="btn btn-light col-1" type="button"
                    onClick={ () => setShowConfirmPassword(!showConfirmPassword) }
                >
                    {
                        !showConfirmPassword ? "👁" : "🔒"
                    }
                </button>
            </div>

            {/* <div className="form-check text-start my-3">
                <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault"/>
                <label className="form-check-label" htmlFor="flexCheckDefault">
                    Remember me
                </label>
            </div> */}
            <button className="btn btn-primary w-100 py-2"
                onClick={ () => register(email, username, password, confirmPassword)}
            >
                Sign in
            </button>
        </div>
    </main>
}


export default Singup;