import type { FC } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetAllGigs } from "../../service/gig.js";
import Title from "./title.js";
import Loader from "../../components/loader";
import Error from "../../components/error";
import type { Err } from "../../types";
import Card from "../../components/card/index.js";

const Search: FC = () => {
  const [searchParams] = useSearchParams();

  // Access parameters from the URL
  const query = searchParams.get("query");
  const category = searchParams.get("category");

  // Create parameters to send to the API
  const params = {
    category,
    search: query,
  };

  // Fetch service data from the API
  const { isLoading, error, data, refetch } = useGetAllGigs(params);

  return (
    <div>
      <Title search={query} category={category} />

      {isLoading ? (
        <Loader designs="my-40" />
      ) : error ? (
        <Error error={error as Err} refetch={refetch} />
      ) : (
        <div className="layout">
          {data?.map((item) => (
            <Card key={item._id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
