import React from 'react';
import { useParams } from 'react-router-dom';
import SideBar from '../../components/SideBar/SideBar';
import AllProducts from '../AllProducts/AllProducts';
import AddProduct from '../AddProduct/AddProduct'; 
import EditProduct from '../EditProduct/EditProduct'; 
import './Dashbord.css';

const Dashbord = ({ mass }) => {
    const { productId } = useParams();

    return (
        <div className="dashboard">
            <SideBar />
            <div className="main-content">
                {productId ? (
                    <EditProduct />
                ) : (
                    mass === "AllProducts" ? (
                        <AllProducts />
                    ) : (
                        <AddProduct />
                    )
                )}
            </div>
        </div>
    );
};

export default Dashbord;
