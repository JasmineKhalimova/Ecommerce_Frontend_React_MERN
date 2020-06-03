import React, {useState} from "react";
import Layout from '../core/Layout';
import { Link } from 'react-router-dom';
import { signup } from '../auth';

const Signup =() => {
    // useState
    const [ values, setValues ] = useState ({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    });

    // higher orger function - it is function returning another fuction 
    // name is dynamic
    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value});
    };

    // declaring values/variables
    const { name, email, password, success, error } = values;

    // click submit sending to DB
    const clickSubmit = event => {
        event.preventDefault(); // stoping browsers from reloading
        setValues({ ...values, error: false });
        signup({ name, email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    error: '',
                    success: true
                });
            }
        });
    };

    const SignUpForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" className="form-control" onChange={handleChange('name')} value={name}></input>
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input type="email" className="form-control" onChange={handleChange('email')} value={email}></input>
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input type="password" className="form-control"  onChange={handleChange('password')} value={password} ></input>
            </div>
            <button className="btn btn-success mb-5" onClick={clickSubmit} >Submit</button>
        </form>
    );
    // Returing success or error messages 
    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
            New account is created. Please <Link to="/signin">Signin</Link>
        </div>
    );
    return (
        <Layout title="Signup Page" description="User Registretion Page" className="container col-md-8 offset-md-2">
            {showSuccess()}
            {showError()}
            {SignUpForm()}
        </Layout>
    );
};

export default Signup;