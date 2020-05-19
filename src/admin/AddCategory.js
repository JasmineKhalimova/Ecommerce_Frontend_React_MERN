import React, {useState} from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { createCategory } from "./apiAdmin";

const AddCategory = () => {
    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    //destructure user and token from loscal storage
    const {user, token } = isAuthenticated();

    //Handle change event
    const handleChange = e => {
        setError("");
        setName(e.target.value);
    };

    // On submit event
    const clickSubmit = e => {
        e.preventDefault();
        setError("");
        setSuccess(false);
        // make request to api to create category
        createCategory(user._id, token, { name }).then(data => {
            if (data.error) {
                setError(true);
            } else {
                setError("");
                setSuccess(true);
            }
        });
    };

    // Category Form
    const newCategoryForm = () => (
        <form onSubmit={clickSubmit}>
            <div className="form-group">
                <label className="text-muted"> Name</label>
                <input type="text" className="form-control" onChange={handleChange} value={name} autoFocus required></input>
            </div>
            <button className="btn btn-outline-primary">Create Category</button>
        </form>
    );

    //Api response feedback
    const showSuccess = () => {
        if (success) {
            return <h3 className="text-success">{name} category is created</h3>;
        }
    };

    const showError = () => {
        if (error) {
            return <h3 className="text-danger">{name} category already exists</h3>;
        }
    };
    const goBack = () => (
        <div className="mt-5">
            <Link to="/admin/dashboard" className="text-warning">
                Back to Dashboard
            </Link>
        </div>
    );

    return (
        <Layout title="Add New Category" description={`Hello ${user.name}`}>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showSuccess()} 
                    {showError()} 
                    {newCategoryForm()} 
                    {goBack()} 
                </div>
            </div>
        </Layout>
    );
};

export default AddCategory;