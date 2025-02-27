import React from "react";

const Singup = () => {
    return <main className="form-signin w-100 m-auto
            d-flex justify-content-center align-items-center"
            style={{minHeight: "75vh"}}
        >
        <form className="col-6 mx-auto">
            <span className="text-start d-block mb-4 mt-2 ">
                <svg xmlns="http://www.w3.org/2000/svg" width="72" height="57" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zm0 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1z"/>
                    <path d="M8 4a2 2 0 1 1-1.117 3.648 2 2 0 0 1 2.234 0A2 2 0 0 1 8 4z"/>
                </svg>
            </span>
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

            <div className="form-floating">
            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
            <label for="floatingInput">Email address</label>
            </div>
            <div className="form-floating">
            <input type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
            <label for="floatingPassword">Password</label>
            </div>

            <div className="form-check text-start my-3">
            <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault"/>
            <label className="form-check-label" for="flexCheckDefault">
                Remember me
            </label>
            </div>
            <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
        </form>
    </main>
}


export default Singup;