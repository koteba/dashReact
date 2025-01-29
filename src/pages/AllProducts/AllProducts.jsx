import { useState, useEffect } from "react";
import axios from "axios";
import "./AllProducts.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";

const AllProducts = () => {
    const [products, setProducts] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const navigate = useNavigate();
    const handleEditClick = (productId) => {
        navigate("/edit/${productId}"); 
    };
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem("token");
                const { data } = await axios.get("https://vica.website/api/items", {
                    headers: {
                        Authorization: token,
                        Accept: "application/json",
                    },
                });
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error.response?.data || error.message);
                if (error.response?.status === 401) {
                    alert("You are not authorized. Please log in.");
                    navigate("/login");
                }
            }
        };

        fetchProducts();
    }, [navigate]);

    const handleDeleteClick = (productId) => {
        setSelectedProduct(productId);
        setShowPopup(true);
    };

    const handleConfirmDelete = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.delete(`https://vica.website/api/items/${selectedProduct}`, {
                headers: {
                    Authorization: token,
                    Accept: "application/json",
                },
            });
            setProducts(products.filter((product) => product.id !== selectedProduct));
            setShowPopup(false);
        } catch (error) {
            console.error("Error deleting product:", error.response?.data || error.message);
            alert("Failed to delete the product. Please try again.");
        }
    };

    return (
        <>
            <Header title="products" />
            <div className="container-products">
                <div className="header-product">
                    <h1>Manage Products</h1>
                    <button className="add_button">
                        <Link to="/product">+ Add Product</Link>
                    </button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Image</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? (
                            products.map((product, index) => (
                                <tr key={product.id}>
                                    <td>{index + 1}</td>
                                    <td>{product.name}</td>
                                    <td>${product.price}</td>
                                    <td>
                                        <img
                                            src={product.image_url || "https://via.placeholder.com/50"}
                                            alt={product.name}
                                            style={{ width: "50px", height: "50px" }}
                                        />
                                    </td>
                                    <td>
                                        <div className="action_buttons">
                                            <button className="edit" onClick={() => handleEditClick(product.id)}>
                                                <FaRegEdit />
                                            </button>

                                        <button
                                            className="delete"
                                            onClick={() => handleDeleteClick(product.id)}
                                        >
                                            <RiDeleteBin6Line />
                                        </button>
                                    </div>
                                </td>
                                </tr>
                    ))
                    ) : (
                    <tr>
                        <td colSpan="5">No products found.</td>
                    </tr>
                        )}
                </tbody>
            </table>

            {/* Delete Confirmation Popup */}
            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-box">
                        <h3>Are you sure you want to delete this product?</h3>
                        <div className="popup-buttons">
                            <button className="btn-yes" onClick={handleConfirmDelete}>
                                Yes
                            </button>
                            <button className="btn-no" onClick={() => setShowPopup(false)}>
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div >
        </>
    );
};

export default AllProducts;
