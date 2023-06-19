import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const Index = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  //   const [rememberMe, setRememberMe] = useState<boolean>(false);

  const base_url = process.env.NEXT_PUBLIC_API_URL;

  //   const handleRemember = () => {
  //     setRememberMe(!rememberMe);
  //   };

  //   console.log(rememberMe);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post(`${base_url}/auth/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res);
        console.log(res.data.data.access_token);
        Cookies.set("access_token", res.data.data.access_token);
        // if (rememberMe) {
        //   localStorage.setItem("access_token", res.data.data.access_token);
        // }
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
        <div className="welcome pt-8">Login</div>
        <form className="pt-12 pl-12 text-black">
          <input
            className="email "
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="pass"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <div className="py-6 remember flex gap-2">
            <input
              type="checkbox"
              name="remember"
              value="remember"
              checked={rememberMe}
              onChange={handleRemember}
            />
            <div>Remember Me</div>
          </div> */}
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
