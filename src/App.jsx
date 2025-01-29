import { Routes, Route } from 'react-router-dom'; // استيراد Route بدلاً من Routes

import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
// import SignUpSec from './components/SignUpSec';
import Dashbord from './pages/Dashbord/Dashbord';
import AddProduct from './pages/AddProduct/AddProduct';

function App() {
  return (
    <>
      {/* <Dashbord /> */}
      <Routes>
        <Route
          path="/DASH"
          element={<Dashbord mass="AllProducts" />}
        />
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {/* <Route path="/reg" element={<SignUpSec />} /> */}
        <Route
          path="/product"
          element={<Dashbord mass="AddProduct" />}
        />
        <Route
          path="/edit/:productId"
          element={<Dashbord mass="EditProduct" />}
        />
      </Routes>

    </>
  );
}

export default App;