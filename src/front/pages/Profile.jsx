import React, { useState } from "react";
import SimpleCard from "../components/SimpleCard";
import useGlobalReducer from "../hooks/useGlobalReducer";

const Profile = () => {

    const { store } = useGlobalReducer();

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
                            <h3 className="card-title">{store.user && store.user.name}</h3>
                            <p className="card-text text-muted">
                                <i className="bi bi-envelope"></i> {store.user && store.user.email}
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
                            {store.user && store.user.post && store.user.post.map(post => (
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