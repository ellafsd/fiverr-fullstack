import type { FC } from "react";
import { useLogout } from "../../service/auth";
import type { IUser } from "../../types";
import { Link } from "react-router-dom";

interface Props {
  user: IUser;
}

const User: FC<Props> = ({ user }) => {
  const { mutate, isPending } = useLogout();

  const menuItems = [
    user.isSeller && { to: "/my-gigs", label: "My Services" },
    user.isSeller && { to: "/add-gig", label: "Add Service" },
    { to: "/", label: "Orders" },
    { to: "/", label: "Messages" },
  ].filter(Boolean) as { to: string; label: string }[];

  return (
    <>
      <img
        src={user.profilePicture}
        className="size-[40px] rounded-full object-cover"
        alt="User avatar"
      />
      <span>{user.username}</span>

      <div>
        <div className="w-[150px] text-[13px] flex-col absolute top-[40px] left-[-20px] transition duration-500 bg-gray-200 rounded-md text-center hidden group-hover:flex">
          {menuItems.map(({ to, label }, i) => (
            <Link key={i} to={to} className="header-link">
              {label}
            </Link>
          ))}

          <button
            onClick={() => mutate()}
            disabled={isPending}
            className="header-link"
          >
            Log Out
          </button>
        </div>
      </div>
    </>
  );
};

export default User;
