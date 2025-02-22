import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-dark">
			<div className="container">
				<Link to="/" className="text-decoration-none">
					<span className="mb-0 text-white">4Geeks</span>
				</Link>
				<div className="ml-auto">
					<Link to="/profile" className="text-decoration-none">
						<button className="btn btn-light">Profile</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};