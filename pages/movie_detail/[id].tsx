import { useRouter } from "next/router";
import React from "react";

const MovieDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  return <div>ID is {id}</div>;
};

export default MovieDetail;
