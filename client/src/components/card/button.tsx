import type { FC } from "react";
import { useDeleteGig } from "../../service/gig";
import Loader from "../loader";

interface Props {
  id: string;
  show: boolean;
}

const Button: FC<Props> = ({ id, show }) => {
  // set up the mutation
  const { mutate, isPending } = useDeleteGig(id);

  // when the button is clicked
  const handleClick = () => {
    // stop the function if the user does not confirm
    if (!confirm("Are you sure you want to delete this service?")) return;

    // delete the service from the API
    mutate();
  };

  return (
    show && (
      <div className="flex justify-end px-2">
        <button
          disabled={isPending}
          className="button bg-red-500 cursor-pointer h-8"
          onClick={handleClick}
        >
          {isPending ? <Loader designs="!text-lg text-white" /> : "Delete"}
        </button>
      </div>
    )
  );
};

export default Button;
