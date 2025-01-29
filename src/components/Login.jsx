
// const Login = () => {
//   const [email, setemail] = useState("");

//   const [password, setpassword] = useState("");
//   const send = (event) => {
//     event.preventDefault();
//     fetch("https://vica.website/api/login", {
//       method: "POST",
//       body: JSON.stringify({
//         email,
//         password
//       }),
//     })
//       .then((res) => {
//         console.log("Status Code:", res.status);
//         return res.text(); // احصل على النص الكامل للاستجابة
//       })
//       .then((text) => console.log("Raw response:", text))
//       .catch((error) => console.error("Fetch error:", error));


//   }

//   return <form onSubmit={(event) => send(event)}>

//     <input
//       type="email"
//       placeholder="email"
//       onChange={(event) => setemail(event.target.value)}
//     />

//     <input
//       type="password"
//       placeholder="Password"
//       onChange={(event) => setpassword(event.target.value)}
//     />


//     <input type="submit" value="Login" />
//   </form>
// };

// export default Login;
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const send = (event) => {
    event.preventDefault();

    fetch("https://vica.website/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // لإعلام الخادم أن البيانات JSON
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => {
        console.log("Status Code:", res.status);
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json(); // تحويل النص إلى JSON
      })
      .then((data) => {
        console.log("Response Data:", data);
        // إذا كان هناك رمز مميز أو بيانات، يمكنك تخزينها
        if (data.token) {
          localStorage.setItem("token", `Bearer ${data.token}`); // حفظ الرمز المميز
        }
      })
      .catch((error) => console.error("Fetch error:", error));
  };

  return (
    <form onSubmit={(event) => send(event)}>
      <input
        type="email"
        placeholder="Email"
        onChange={(event) => setemail(event.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(event) => setpassword(event.target.value)}
      />
      <input type="submit" value="Login" />
    </form>
  );
};

export default Login;
