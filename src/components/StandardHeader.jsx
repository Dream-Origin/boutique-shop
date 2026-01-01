import React, { useState } from "react";
import "./StandardHeader.css";
import boutiqueLogo from '../data/images/logo.png';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useApplyHomeFilter } from '../hooks/useApplyHomeFilter'
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";

function StandardHeader({ cart }) {
    const navigate = useNavigate()
    const applyFilter = useApplyHomeFilter()
    const navigateToHome = () => {
        navigate('/')
    }
    const navigateToCart = () => {
        navigate('/cart')
    }
    const navigateToOrders = () => {
        navigate('/my-orders')
    }

    return (
        <header className="standard-header">
            <div className="header-row-top">
                <div className="header-social-row">

                    <a href="https://www.instagram.com/tharagaithedressshop/" aria-label="Instagram" className="icon-social">
                        {/* Instagram SVG */}
                        <svg width="22" height="22" fill="none" viewBox="0 0 22 22"><rect x="3" y="3" width="16" height="16" rx="5" stroke="#444" strokeWidth="2" /><circle cx="11" cy="11" r="4" stroke="#444" strokeWidth="2" /><circle cx="16.5" cy="5.5" r="1" fill="#444" /></svg>
                    </a>
                    <a href="https://www.youtube.com/@tharagaiboutique5735" aria-label="YouTube" className="icon-social">
                        {/* YouTube SVG */}
                        <svg width="23" height="23" fill="none" viewBox="0 0 23 23"><rect width="22" height="22" fill="none" /><path d="M19.5 6.909c-.24-.904-.948-1.604-1.841-1.845C15.791 4.727 11.5 4.727 11.5 4.727s-4.291 0-6.159.337C4.448 5.305 3.74 6.005 3.5 6.909c-.33 1.244-.33 3.846-.33 3.846s0 2.602.33 3.846c.24.904.948 1.604 1.841 1.845 1.868.337 6.159.337 6.159.337s4.291 0 6.159-.337c.893-.241 1.601-.941 1.841-1.845.33-1.244.33-3.846.33-3.846s0-2.602-.33-3.846ZM9.727 13.614V7.977l5.182 2.819-5.182 2.818Z" fill="#444" /></svg>
                    </a>

                </div>
                <div className="header-center-logo">

                    <img src={boutiqueLogo} height="50" onClick={navigateToHome} />

                </div>
                <div className="header-actions-row">

                    <button
                        className="header-icon"
                        aria-label="Cart"
                        style={{ position: "relative" }}
                        onClick={navigateToCart}
                    >
                        <MdOutlineShoppingCart size={23} color="#444" />
                        {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
                    </button>


                </div>
            </div>
            <nav className="header-categories-row">
                <span onClick={navigateToHome}>Home</span>
                <span onClick={() => applyFilter('newArrival')}>New Arrivals</span>
                <span onClick={() => applyFilter('salwarMaterial')}>Salwar materials</span>
                <span onClick={() => applyFilter('readyToWear')}>Ready to wear</span>
                <span onClick={() => applyFilter('bestSeller')}>Best Seller</span>
                <span onClick={() => applyFilter('exclusive')}>Exclusive</span>
                <span onClick={navigateToOrders}>My Orders</span>
            </nav>
        </header>
    );
}

export default StandardHeader;
