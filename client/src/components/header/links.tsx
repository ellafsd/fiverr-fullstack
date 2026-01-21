import React from "react";
import { Link } from "react-router-dom";

const Links = () => {
  return (
    <>
      <Link to="/login" className="transition hover:text-green-700">
        Login
      </Link>
      <Link to="/register" className="transition border rounded border-green-700 p-1 hover:bg-green-700 hover:text-white">
        Register
      </Link>
    </>
  );
};

export default Links;
