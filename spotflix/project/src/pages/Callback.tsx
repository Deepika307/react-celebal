import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (!code) {
      console.error("No code found in callback URL");
      return;
    }

    // Exchange the code for an access token (via backend OR directly)
    fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          btoa(
            "5dba073673f94373a4b20618a4001a79" +
              ":" +
              "109ed80d7ec54d5b8c0ede5bd8e58c1d"
          ),
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: "http://127.0.0.1:5173/callback",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("access_token", data.access_token);
        navigate("/"); 
      })
      .catch((err) => {
        console.error("Failed to exchange token:", err);
      });
  }, [navigate]);

  return (
    <div className="h-screen flex items-center justify-center text-white">
      Logging in...
    </div>
  );
};

export default Callback;
