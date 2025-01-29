import { useState } from "react";

const SignUp = () => {
    const [first_name, setFirst_name] = useState("");
    const [last_name, setlast_name] = useState("");
    const [user_name, setuser_name] = useState("");
    const [email, setemail] = useState("");
    const [confirm, setconfirm] = useState("");
    const [password, setpassword] = useState("");
    const [image, setimage] = useState(null);



    const send = (event) => {
        event.preventDefault();
        let data = new FormData();
        data.append("first_name", first_name);
        data.append("last_name", last_name);
        data.append("user_name", user_name);
        data.append("email", email);
        data.append("password", password);
        data.append("password_confirmation", confirm);
        data.append("profile_image", image);


        // console.log(data)
        fetch("https://vica.website/api/register", {
            method: "POST",
            body: data,
        })
            .then((res) => {
                console.log("Status Code:", res.status);
                return res.text(); // احصل على النص الكامل للاستجابة
            })
            .then((text) => console.log("Raw response:", text))
            .catch((error) => console.error("Fetch error:", error));



    };

    return (
        <form onSubmit={(event) => send(event)}>
            <input
                type="text"
                placeholder="First name"
                onChange={(event) => setFirst_name(event.target.value)}
            />
            <input
                type="text"
                placeholder="Last name"
                onChange={(event) => setlast_name(event.target.value)}
            />
            <input
                type="text"
                placeholder="User name"
                onChange={(event) => setuser_name(event.target.value)}
            />
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
            <input
                type="password"
                placeholder="Confirm password"
                onChange={(event) => setconfirm(event.target.value)}
            />
            <input
                type="file"
                onChange={(event) => setimage(event.target.files[0])}
            />
            <input type="submit" value="Sign up" />
        </form>
    );
};

export default SignUp;
