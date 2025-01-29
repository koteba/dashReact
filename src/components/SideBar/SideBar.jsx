import './SideBar.css';
import { AiOutlineDashboard } from "react-icons/ai";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { AiOutlineLogout } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useState } from "react";

const SideBar = () => {
  const [showPopup, setShowPopup] = useState(false); // إدارة حالة الـ Popup

  const handleLogoutClick = () => {
    setShowPopup(true); // عرض الـ Popup عند النقر على زر Logout
  };

  const handleClosePopup = () => {
    setShowPopup(false); // إغلاق الـ Popup
  };

  return (
    <div className="sidebar">
      <div className="logo">
        Dash<span>Stack</span>
      </div>
      <ul className="menu">
        <li>
          <a href="#" className="active">
            <i><AiOutlineDashboard /></i> Dashboard
          </a>
        </li>
        <li>
          <a href="#">
            <i><MdOutlineProductionQuantityLimits /></i> Products
          </a>
        </li>
      </ul>
      <div className="logout">
        <button onClick={handleLogoutClick} className="logout-button">
          <AiOutlineLogout /> Logout
        </button>
      </div>

      {/* عرض الـ Popup إذا كانت حالة showPopup تساوي true */}
      {showPopup && (
        <div className="popup-container">
          <div className="popup-content">
            <h2>Are you sure you want to logout?</h2>
            <div className="popup-buttons">
              <button onClick={handleClosePopup}>Cancel</button>
              <Link to="/" className="confirm-logout">Logout</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
