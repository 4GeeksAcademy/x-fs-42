import { useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import toast from "react-hot-toast";

export const Navbar = () => {

	const { store, dispatch } = useGlobalReducer();

	const getProfile = async (token) => {
		const myHeaders = new Headers();
		myHeaders.append("Authorization", "Bearer " + token);

		const requestOptions = {
			method: "GET",
			headers: myHeaders
		};

		const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/users/me", requestOptions);
		const data = await resp.json();
		if(!resp.ok) {
			toast.error(data.message);
			return;
		}
		dispatch({ 
			type: "assign_user", 
			payload: data 
		});

	};

	useEffect(() => {
		if(store.token) {
			getProfile(store.token);
		}
	}, []);

	return (
		<nav className="navbar navbar-light bg-dark">
			<div className="container">
				<Link to="/" className="text-decoration-none">
					<span className="mb-0 text-white">4Geeks</span>
				</Link>

				
				<div className="ml-auto">
					<span className="text-white mx-2">
						{
							store.user && `Welcome ${store.user.email}`
						}
					</span>
					{	(!store.user || !store.token) && <>
							<Link to="/signup" className="text-decoration-none mx-2">
								<button className="btn btn-secondary">Register</button>
							</Link>

							<Link to="/login" className="text-decoration-none mx-2">
								<button className="btn btn-secondary">Log In</button>
							</Link>
						</>
					}
					{ store.user && <Link to="/profile" className="text-decoration-none">
							<button className="btn btn-light">Profile</button>
						</Link>
					}

					{ store.user && <button className="btn btn-danger mx-2" 
						onClick={() => {
							localStorage.removeItem("token");
							dispatch({ type: "set_token", payload: null });
							dispatch({ type: "assign_user", payload: null });
						}}
						>
							Log Out
						</button>
					}
				</div>
			</div>
		</nav>
	);
};