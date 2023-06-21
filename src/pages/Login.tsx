import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { name, email } from "../utils/userInfo";

const Index = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const base_url = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post(`${base_url}/auth/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        // console.log(res);
        // console.log(res.data.data.access_token);
        dispatch(name(res.data.data.name));
        Cookies.set("username", res.data.data.name);
        Cookies.set("access_token", res.data.data.access_token);
        router.push("/Dashboard");
      })
      .catch((error: any) => {
        console.error("error >>>", error);
      });
  };

  return (
    <div id="login" className="h-screen">
      <div className="pt-10 pb-[138px]">
        {/* <img className="mx-auto " src="" alt="Logo" /> */}
      </div>
      <div className="loginForm">
        <div className="welcome pt-8 text-center font-black text-[#34174a] text-3xl">
          Login
        </div>
        <form className="pt-12 pl-12 text-black">
          <input
            className="email  text-sm"
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="pass text-sm"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className={`btn mt-12 ${
              !email || !password
                ? "bg-[#B9B9B9] flex"
                : "bg-[#34174a] hover:bg-[#45295b] flex"
            }`}
            disabled={!email || !password}
            onClick={handleLogin}
          >
            <p>Login</p>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Index;
