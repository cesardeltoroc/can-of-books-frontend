import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Userbooks from "./Userbooks";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div className='loading'>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div className="profile">
        <img src={user.picture} alt={user.name}/>
        <h2>Welcome, {user.name}</h2>
        <p>{user.email}</p>
        <Userbooks />
      </div>
    )
  );
};

export default Profile;
