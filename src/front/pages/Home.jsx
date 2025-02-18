import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useEffect } from "react";

const SimpleCard = ({title, author}) => (
	<div class="card">
		<div class="card-header">
			Post by {author}
		</div>
		<div class="card-body">
			<h5 class="card-title">{new Date().toLocaleDateString()}</h5>
			<p class="card-text">{title}.</p>
			<a href="#" class="btn btn-primary">Details</a>
		</div>
	</div>
);

export const Home = () => {

  const { store, dispatch} =useGlobalReducer()


	const loadPosts = async () => {
		const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/posts");
		const data = await response.json();
		console.log(data);
		dispatch({
			type: "load_posts",
			payload: data
		});
	}

	useEffect(() => {
		loadPosts();
	}, []);

	return (
		<div className="text-center mt-5">
			<h1>Instagram Model Practice</h1>
			{
				store.posts.map((post, index) => <SimpleCard key={index} {...post} />)
			}
		</div>
	);
}; 