import React, { useState } from "react";
import "./MyOrders.css";
import { searchOrders } from "../api/ordersApi";

function MyOrders() {
    const [userInput, setUserInput] = useState("");
    const [orders, setOrders] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [filterStatus, setFilterStatus] = useState("All");
    const [loading, setLoading] = useState(false);

    const orderStatuses = [
        "All",
        "Pending",
        "Confirmed",
        "Processing",
        "Packed",
        "Shipped",
        "In Transit",
        "Out for Delivery",
        "Delivered",
        "Cancelled",
        "Returned",
        "Refund Completed",
    ];

    const fetchOrders = async () => {
        if (!userInput.trim()) {
            alert("Enter mobile number or email");
            return;
        }

        setLoading(true);

        try {
            // Determine if user input is email or mobile
            const isEmail = userInput.includes("@");
            const searchParams = isEmail
                ? { email: userInput }
                : { mobile: userInput };

            // Call API
            const data = await searchOrders(searchParams);

            setOrders(data);
            setFiltered(data);
            setFilterStatus("All"); // reset filter
        } catch (err) {
            console.error("Fetch Orders Error:", err);
            alert("Unable to fetch orders");
        }

        setLoading(false);
    };

    const filterByStatus = (status) => {
        setFilterStatus(status);

        if (status === "All") {
            setFiltered(orders);
        } else {
            setFiltered(orders.filter((o) => o.status === status));
        }
    };

    return (
        <div className="orders-page">

            {/* Search Box */}
            <div className="orders-search-box">
                <input
                    type="text"
                    placeholder="Enter Mobile or Email"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                />
                <button onClick={fetchOrders}>Get Orders</button>
            </div>

            {/* Loader */}
            {loading && <p>Loading orders...</p>}

            {/* Filters */}
            {!loading && orders.length > 0 && (
                <div className="order-filters">
                    {orderStatuses.map((status) => (
                        <button
                            key={status}
                            className={filterStatus === status ? "filter-active" : ""}
                            onClick={() => filterByStatus(status)}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            )}

            {/* Order List */}
            <div className="orders-list">
                {filtered.length === 0 && orders.length > 0 && (
                    <p>No orders found in this status.</p>
                )}

                {filtered.map((order) => (
                    <div key={order.orderId} className="order-card">
                        <div className="order-header">
                            <span>Order ID: {order.orderId}</span>
                            <span className={`status-badge status-${order.status.replace(/\s/g, "")}`}>
                                {order.status}
                            </span>
                        </div>

                        <div className="order-items">
                            {order.items.map((item) => (
                                <div className="order-item" key={item.id}>
                                    <img src={item.images?.[0]} alt={item.title} />
                                    <div>
                                        <p>{item.title}</p>
                                        {item.size && <p>Size: {item.size}</p>}
                                        <p>Qty: {item.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="order-footer">
                            <span>Total: ₹{order.totalAmount}</span>
                            <span>Placed on: {order.createdAt}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyOrders;
