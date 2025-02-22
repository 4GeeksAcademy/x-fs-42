import React, { useState } from "react";
import SimpleCard from "../components/SimpleCard";

const Profile = () => {
    const [user, setUser] = React.useState({
        name: 'John Doe',
        email: 'john@example.com',
        posts: [
            { id: 1, title: 'First Post', content: 'Hello world!', date: '2023-07-01' },
            { id: 2, title: 'Second Post', content: 'Another post here', date: '2023-07-02' }
        ]
    });

    const id = 3;

    React.useEffect(() => {
        fetch(import.meta.env.VITE_BACKEND_URL + `api/users/${id}`)
            .then(response => response.json())
            .then(data => setUser(data));
    }, [id]);

    return (
        <div className="container py-5">
            <div className="row">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body text-center">
                            <img 
                                src="https://i.pravatar.cc/150?u=DavidRosas" 
                                className="rounded-circle mb-3" 
                                alt="Profile"
                            />
                            <h3 className="card-title">{user.name}</h3>
                            <p className="card-text text-muted">
                                <i className="bi bi-envelope"></i> {user.email}
                            </p>
                            <div className="d-grid gap-2">
                                <button className="btn btn-primary">Edit Profile</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header bg-white">
                            <h4 className="mb-0">My Posts</h4>
                        </div>
                        <div className="card-body">
                            {user && user.post && user.post.map(post => (
                                <SimpleCard key={post.id} {...post} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;