import type { FC } from "react";
import type { IGig, ShortUser } from "../../types";
import { Link } from "react-router-dom";
import Rating from "./rating.js";
import Button from "./button.js";

interface Props {
  item: IGig<ShortUser>;
  expand?: boolean;
}

const Card: FC<Props> = ({ item, expand = false }) => {
  return (
    <div>
      <Button id={item._id} show={expand} />

      <Link
        to={`/detail/${item._id}`}
        className="p-2 rounded-md cursor-pointer flex flex-col gap-2 group"
      >
        <img
          src={item.coverImage}
          alt={item.title}
          className="size-full object-cover rounded-md max-h-[200px]"
        />

        <div className="flex gap-2 items-center">
          <img
            src={item.user.profilePicture}
            alt={item.user.username}
            className="size-8 rounded-full"
          />

          <p>
            <span className="font-semibold">created by {item.user.username}</span>
            <span className="text-gray-500 ps-1"></span>
          </p>
        </div>

        <h2 className="line-clamp-2 group-hover:underline">{item.title}</h2>

        <Rating
          rating={item.starCount}
          reviews={item.reviewCount}
          designs="font-semibold text-lg"
        />

        <p>
          <span className="text-gray-500">Starting from </span>
          <span className="font-semibold">
            ${item.packagePrice.toLocaleString()}
          </span>
        </p>
      </Link>
    </div>
  );
};

export default Card;
