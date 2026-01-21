import type { FC } from "react";
import { useProfile } from "../../service/auth";
import Loader from "../loader";
import { Navigate, Outlet } from "react-router-dom";

const Protected: FC = () => {
 // Get the currently logged-in user data
  const { user, isLoading } = useProfile();

  // Show loader while user data is being fetched
  if (isLoading) return <Loader />;

  // If the user is not logged in or is not a seller,
  // block access and redirect to the login page
  if (!user || !user.isSeller) return <Navigate to="/login" replace />;

 // Render the requested page for seller users
  return <Outlet />;
};

export default Protected;
