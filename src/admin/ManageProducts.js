import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "./apiAdmin";

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const { user, token } = isAuthenticated();
    const loadProducts = () => {
        getProducts().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setProducts(data);
            }
        });
    };

    const destroy = productId => {
        deleteProduct(productId, user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadProducts();
            }
        });
    };

    useEffect(() => {
        loadProducts();
    }, []);

    // go back to dashboard
    const goBack = () => (
        <div className="mt-5 mb-5">
            <Link to="/admin/dashboard" className="text-warning">
                Back to Dashboard
            </Link>
        </div>
    );
    return (
        <Layout title="Manage Products" description="You can update or delete products" className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <h2 className="text-center">
                        Total {products.length} products
                    </h2>
                    <hr />
                    <ul className="list-group mb-5">
                        {products.map((p, i) => (
                            <li key={i} className="list-group-item  d-inline-block">
                                <strong>{p.name}</strong>
                                <Link to={`/admin/product/update/${p._id}`} className="badge badge-warning badge-pill float-right ml-3">
                                    <span className="badge badge-warning badge-pill">
                                        Update
                                    </span>
                                </Link>
                                <span onClick={() => destroy(p._id)} className="badge btn badge-danger badge-pill float-right">
                                    Delete
                                </span>
                            </li>
                        ))}
                    </ul>
                    {goBack()} 
                </div>
            </div>
        </Layout>
    );
};

export default ManageProducts;
