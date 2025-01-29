import { useState, useEffect } from "react";
import axios from "axios";
import { GrCloudUpload } from "react-icons/gr";
import './EditProduct.css';
import Header from "../../components/Header/Header";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productImage, setProductImage] = useState(null);
    const [currentImage, setCurrentImage] = useState(""); 
    const navigate = useNavigate();
    const { productId } = useParams(); 

    
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`https://vica.website/api/items/${productId}`, {
                    headers: {
                        "Accept": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });
                const product = response.data;
                setProductName(product.name);
                setProductPrice(product.price);
                setCurrentImage(product.image); 
            } catch (error) {
                console.error("Error fetching product data:", error.response?.data || error.message);
                alert("Failed to fetch product data.");
            }
        };

        fetchProduct();
    }, [productId]);

    const send = async (event) => {
        event.preventDefault();

        try {
            let data = new FormData();
            data.append("name", productName);
            data.append("price", productPrice);
            if (productImage) {
                data.append("image", productImage);
            }
            data.append("_method", "PUT"); 

            const token = localStorage.getItem("token");
            const response = await axios.post(`https://vica.website/api/items/${productId}`, data, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            console.log("Response Data:", response.data);
            alert("Product updated successfully!");
            navigate("/DASH");
        } catch (error) {
            console.error("Edit Product Error:", error.response?.data || error.message);
            alert("Failed to update product. Please check the server and try again.");
        }
    };

    return (
        <>
            <Header title="products / edit" />
            <div className="form_container">
                <h2>Edit Product</h2>
                <form onSubmit={send} encType="multipart/form-data">
                    <div className="form-columns">
                        <div className="column_input">
                            <div className="form-group">
                                <label htmlFor="productName">Product Name</label>
                                <input
                                    type="text"
                                    id="productName"
                                    name="productName"
                                    required
                                    placeholder="Enter Product Name"
                                    value={productName}
                                    onChange={(event) => setProductName(event.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="productPrice">Price</label>
                                <input
                                    type="number"
                                    id="productPrice"
                                    name="productPrice"
                                    required
                                    placeholder="Enter Price"
                                    value={productPrice}
                                    onChange={(event) => setProductPrice(event.target.value)}
                                />
                            </div>
                        </div>
                        <div className="column_image">
                            <div className="form_group">
                                {currentImage && (
                                    <div className="current-image">
                                        <p>Current Image:</p>
                                        <img
                                            src={`https://vica.website/uploads/${image}`}
                                            alt="Current Product"
                                            className="product-image"
                                        />
                                    </div>
                                )}
                                <label htmlFor="productImage" className="upload-label">
                                    <GrCloudUpload size={110} className="upload-icon" />
                                </label>
                                <input
                                    type="file"
                                    id="productImage"
                                    name="productImage"
                                    onChange={(event) => setProductImage(event.target.files[0])}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <button type="submit">Save Changes</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditProduct;
