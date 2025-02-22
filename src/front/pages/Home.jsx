import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useEffect } from "react";
import NewPost from "../components/NewPost.jsx";
import SimpleCard from "../components/SimpleCard.jsx";

export const Home = () => {

  const { store, dispatch} = useGlobalReducer()


	const loadPosts = async () => {
		const response = await fetch(import.meta.env.VITE_BACKEND_URL + "api/posts");
		const data = await response.json();
		dispatch({
			type: "load_posts",
			payload: data
		});
	}

	useEffect(() => {
		loadPosts();
	}, []);

	return (
		<div className="mt-5">

			<NewPost />

			<div className="d-flex justify-content-center flex-wrap col-lg-6 col-md-8 col-sm-12 mx-auto">
				<div className="d-flex col-lg-12 col-md-12 col-sm-12">
					<h3 className="ml-auto" style={{ opacity: 0.60 }}>Whats Happening</h3>
				</div>
				{
					store.posts.map((post, index) => <SimpleCard key={index} {...post} />)
				}
			</div>

		</div>
	);
}; 