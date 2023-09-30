import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ALL_ITEMS } from "../../../utils/queries"; // Import the GraphQL query

function Home() {
  // Execute the GraphQL query to fetch item data
  const { loading, error, data } = useQuery(QUERY_ALL_ITEMS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const items = data.items;
  return (
    <div className="home">
      <h2>Home</h2>
      <div className="item-list">
        {items.map((items) => (
          <div key={items._id} className="item-card">
            <img src={items.img} alt={items.name} />
            <h3>{items.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
