import React from "react";

const CLIENT_ID = "5dba073673f94373a4b20618a4001a79";
const REDIRECT_URI = "http://127.0.0.1:5173/callback";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";

const SCOPES = [
  "user-read-private",
  "user-read-email",
  "user-library-read",
  "user-top-read",
  "playlist-read-private",
  "playlist-read-collaborative",
];

const Login = () => {
  const handleLogin = () => {
    const authUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&scope=${encodeURIComponent(
      SCOPES.join(" ")
    )}&response_type=${RESPONSE_TYPE}&show_dialog=true`;

    window.location.href = authUrl;
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <button
        onClick={handleLogin}
        className="bg-green-500 px-6 py-3 rounded-xl font-bold text-lg"
      >
        Login with Spotify
      </button>
    </div>
  );
};

export default Login;
