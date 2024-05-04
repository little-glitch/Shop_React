import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Cart = () => {
    const [cart, setCart] = useState([]);
    const navigator = useNavigate();

    useEffect(() => {
        const data = [];
        const keys = Object.keys(localStorage);
        for (let i = 0; i < keys.length; i++) {
            data.push(JSON.parse(localStorage.getItem(keys[i])));
        }
        setCart(data);
    }, []);

    const buy = () => {
        localStorage.clear();
        navigator('/');
    };

    const removeProduct = (key) => {
        localStorage.removeItem(key);
        setCart(prevCart => prevCart.filter(product => product.id !== key));
    };

    return (
        <section className="vh-100" style={{backgroundColor:"#F0F8FF",position: 'absolute', top: 60, left: 0, width: '100%', height: '100%', backgroundSize: 'cover', backgroundPosition: 'center'}}>
            <div className="container mt-5">
            <div className="row">
                {cart.map((product) => (
                    <div key={product.id} className="col-lg-12 mb-3">
                        <div className="card border- shadow-lg" style={{ color:"black",fontSize: ".9rem", fontWeight: "bold",backgroundColor:"#F0F8FF"}}>
                            <div className="row no-gutters py-auto" >
                                <div className="col-md-4 my-auto" style={{height:"100px", width:"200px"}} >
                                    <img src={product.thumbnail} className="card-img" alt={product.title} style={{height:"100%", width:"100%",objectFit:"cover"}}/>
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title" style={{  fontSize: "1.3rem", fontWeight: "bold", filter: 'brightness(150%)' }}>{product.title}</h5>
                                        <p className="card-text">Price: Rs.{product.price}</p>
                                        <button className="btn btn-warning" onClick={() => removeProduct(product.id)}>Remove</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="row mt-3">
                <div className="col-md-12 text-center">
                    {cart.length !== 0 ? (
                        <button className="btn btn-primary" onClick={buy}>Buy</button>
                    ) : (
                        <p>Click <Link to={'/'}>Home</Link> for adding products to cart.</p>
                    )}
                </div>
            </div>
        </div>
        </section>
    );
}

export default Cart;

