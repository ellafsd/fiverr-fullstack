import type { GetAllGigsParams } from "../../types";

const Title = ({ category, search }: GetAllGigsParams) => {
  return (
    <h1>
      {search ? (
        <p>
          Search results for <span className="font-bold">{search}</span>
        </p>
      ) : category ? (
        <p>
          Results for the <span className="font-bold">{category}</span> category
        </p>
      ) : (
        <p>All results</p>
      )}
    </h1>
  );
};

export default Title;
