import { useEffect, useState } from "react";
import './Header.css';

const Header = ({ title }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser)); 
        }
    }, []);

    return (
        <div className="header">
            <div className="title">{title}</div>
            {user ? (
                <div className="profile">
                    <img src={user.profile_image_url || "https://via.placeholder.com/40"} alt="Profile" />
                    <div className="profile-info">
                        {/* <span className="name">{user.first_name} {user.last_name}</span> */}
                        <span className="user-name">@{user.user_name}</span>
                    </div>
                </div>
            ) : (
                <div className="profile">Loading...</div>
            )}
        </div>
    );
};

export default Header;
