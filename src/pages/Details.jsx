import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const Details = () => {
    const navigator = useNavigate();
    const [data, setData] = useState({});
    const [selectedImage, setSelectedImage] = useState('');
    const { id } = useParams();

    async function getDetails() {
        try {
            const res = await axios.get(`https://dummyjson.com/products/${id}`);
            setData(res.data);
            if (res.data.images && res.data.images.length > 0) {
                setSelectedImage(res.data.thumbnail);
            }
        } catch (error) {
            console.error("Error fetching product details:", error);
        }
    }

    const addToCart = () => {
        const key = data.id;
        localStorage.setItem(key, JSON.stringify(data));
        navigator('/cart');
    };

    useEffect(() => {
        getDetails();
    }, []);

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="row">
                        <div className="col-lg-12 p-3 justify-content-center">
                            <img src={selectedImage || data.thumbnail} className="img-fluid rounded shadow-lg" alt="" style={{ maxHeight: "400px" }} />
                        </div>
                        <div className="col-lg-12 d-flex justify-content-center">
                            <div className="row">
                                {data.images?.map((image, index) => (
                                    <div className="col-lg-2 col-md-4 col-6" key={index}>
                                        <img
                                            src={image}
                                            alt=""
                                            className="img-thumbnail mb-2"
                                            style={{ width: "100%", height: "100%", cursor: "pointer" }}
                                            onMouseOver={() => setSelectedImage(image)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-lg-12 d-flex justify-content-center">
                            <button className="btn btn-lg btn-warning my-3" onClick={addToCart}>Add to Cart</button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="card border-0">
                        <div className="card-body">
                            <h2 className="text-dark">{data.title}</h2>
                            <h3 className="text-secondary">Price: ${data.price}</h3>
                            <h3 className="text-secondary">Rating: {data.rating}</h3>
                            <p className="text-muted">{data.description}</p>
                            <hr className="my-4" />
                            <p className="font-weight-bold">Product Details:</p>
                            <ul className="list-unstyled">
                                <li><strong>Availability:</strong> {data.availability ? "In Stock" : "Out of Stock"}</li>
                                <li><strong>Brand:</strong> {data.brand}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;