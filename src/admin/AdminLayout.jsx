import React, { useState } from "react";
import { Outlet, NavLink, Routes, Route } from "react-router-dom";
import "./AdminLayout.css";
import AdminProductManager from "./AdminProductManager";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className={`admin-layout ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
      <header className="admin-header">
        <button className="sidebar-toggle-btn" onClick={toggleSidebar} aria-label="Toggle sidebar">
          ☰
        </button>
        <div className="admin-header-title">Tharagai Boutique Admin</div>
        <button className="admin-logout-btn">Logout</button>
      </header>

      <aside className="admin-sidebar">
        <nav>
          <NavLink to="/admin/dashboard" className={({ isActive }) => (isActive ? "active-navlink" : "")}>Dashboard</NavLink>
          <NavLink to="/admin/products" className={({ isActive }) => (isActive ? "active-navlink" : "")}>Products</NavLink>
          <NavLink to="/admin/orders" className={({ isActive }) => (isActive ? "active-navlink" : "")}>Orders</NavLink>
          <NavLink to="/admin/users" className={({ isActive }) => (isActive ? "active-navlink" : "")}>Users</NavLink>
        </nav>
      </aside>

      <main className="admin-content">
        <Routes>
          {/* <Route path="dashboard" element={<AdminDashboard />} /> */}
          <Route path="products" element={<AdminProductManager />} />
          {/* <Route path="orders/*" element={<AdminOrderManager />} /> */}
          {/* <Route path="users/*" element={<AdminUserManager />} /> */}
        </Routes>
        {/* <Outlet /> */}
      </main>

      <footer className="admin-footer">
        <p>© 2025 Tharagai Boutique. All rights reserved.</p>
      </footer>
    </div>
  );
}
