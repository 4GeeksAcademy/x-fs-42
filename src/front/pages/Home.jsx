import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useEffect, useState } from "react";

const NewPost = () => {
	const { store, dispatch } = useGlobalReducer();

	const [newPost, setNewPost] = useState({
		title: "",
		author: ""
	});

	const handleForm = (event) => {
		event.preventDefault();

		const publishPost = async (post) => {

			if(post.title.trim() === "" || post.author_email.trim() === ""){
				throw new Error("Title and Author e-mail are required");
			}

			const response = await fetch(import.meta.env.VITE_BACKEND_URL + "api/posts", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(post)
			});
			const data = await response.json();
			if(response.status == 201){
				dispatch({
					type: "add_post",
					payload: post
				});
				setNewPost({
					title: "",
					author: ""
				})
			}
			return data;
		}
		publishPost({ title: newPost.title, author_email: newPost.author });
	}

	return (
		<div className="mt-5">
			<div className="d-flex flex-column justify-content-center col-lg-6 col-md-8 col-sm-12 mx-auto">
				<div className="d-flex justify-content-start">
					<h3 className="text-start ml-auto" style={{ opacity: 0.60 }}>New Post</h3>
				</div>
				<form onSubmit={handleForm} className="col-lg-12 col-md-12 col-sm-12">
					<div className="form-group">
						<textarea 
							className="form-control" 
							id="title" 
							name="title"
							onChange={(event) => setNewPost({ ...newPost, title: event.target.value })}
							value={newPost.title || ""}
							placeholder="What's happening?"
							rows="3"
							style={{ resize: "none" }}
						></textarea>
					</div>
					<div className="form-group d-flex justify-content-end">
						<input 
							type="text" 
							className="form-control" 
							onChange={(event) => setNewPost({ ...newPost, author: event.target.value })}
							value={newPost.author || ""}
							id="author" 
							name="author" 
							placeholder="Author"
						/>
						<button type="submit" className="btn btn-primary rounded-circle ms-2">
							<span className=" d-flex justify-content-center align-items-center">
							<i className="fa-solid fa-plus"></i>
							</span>
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

const SimpleCard = ({title, author}) => (
	<div className="p-2 col-lg-12 col-md-4 col-sm-6">
		<div className="card">
			<div className="card-header">
				Post by {author}
			</div>
			<div className="card-body">
				<h5 className="card-title">{new Date().toLocaleDateString()}</h5>
				<p className="card-text">{title}.</p>
				<p className="btn btn-primary">Details</p>
			</div>
		</div>
	</div>
);

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