import { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import toast from "react-hot-toast";

const NewPost = () => {
    const { dispatch } = useGlobalReducer();

    const [newPost, setNewPost] = useState({
        title: "",
        author: ""
    });

    const handleForm = (event) => {
        event.preventDefault();

        const publishPost = async (post) => {

            if(post.title.trim() === "" || post.author_email.trim() === ""){
                toast.error("Title and Author e-mail are required");
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
                    payload: data
                });
                setNewPost({
                    title: "",
                    author: ""
                })
                toast.success("Post published successfully");
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

export default NewPost;