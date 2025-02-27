import React from "react";
import { useState } from "react";

const Singup = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [ showPassword, setShowPassword ] = useState(false);
    const [ showConfirmPassword, setShowConfirmPassword ] = useState(false);

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

            <div className="d-flex justify-content-between">
                <div className="form-floating col-11">
                    <input type={ showConfirmPassword ? "text" : "password" } className="form-control"  placeholder="Confirm Password"
                        value={confirmPassword || ""} onChange={ event => setConfirmPassword(event.target.value)}
                    />
                    <label for="floatingPassword">Confirm Password</label>
                        
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
                <label className="form-check-label" for="flexCheckDefault">
                    Remember me
                </label>
            </div> */}
            <button className="btn btn-primary w-100 py-2"
                onClick={ () => console.log(email, password, confirmPassword)}
            >
                Sign in

            </button>
        </div>
    </main>
}


export default Singup;