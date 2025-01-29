import { useState } from "react";
import axios from "axios";
import { GrCloudUpload } from "react-icons/gr";
import './AddProduct.css';
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productImage, setProductImage] = useState(null);
    const navigate = useNavigate(); 

    const send = async (event) => {
        event.preventDefault();

        try {
            let data = new FormData();
            data.append("name", productName);
            data.append("price", productPrice);
            data.append("image", productImage);

            const token = localStorage.getItem("token"); 
            const response = await axios.post("https://vica.website/api/items", data, {
                headers: {
                    "Accept": "application/json",
                    "Authorization": token, 
                },
            });

            console.log("Response Data:", response.data);
            alert("Product added successfully!");

            navigate("/DASH");
        } catch (error) {
            console.error("Add Product Error:", error.response?.data || error.message);
            alert("Failed to add product. Please check the server and try again.");
        }
    };

    return (
        <>
            <Header title="products / add" />
            <div className="form_container">
                <h2>Add Product</h2>
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
                                    onChange={(event) => setProductPrice(event.target.value)}
                                />
                            </div>
                        </div>
                        <div className="column_image">
                            <div className="form_group">
                                <label htmlFor="productImage" className="upload-label">
                                    <GrCloudUpload size={110} className="upload-icon" />
                                </label>
                                <input
                                    type="file"
                                    id="productImage"
                                    name="productImage"
                                    required
                                    onChange={(event) => setProductImage(event.target.files[0])}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <button type="submit">Save</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddProduct;
