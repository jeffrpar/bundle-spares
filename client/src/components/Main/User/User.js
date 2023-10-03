import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../../utils/queries';

function User() {
  const { loading, data } = useQuery(QUERY_ME);

  if (loading) {
    return <div>Loading...</div>;
  }

  const user = data.me;

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <h3>Owned Items:</h3>
      <div className="owned-items">
        {user && user.ownedItems && user.ownedItems.length > 0 ? (
          user.ownedItems.map((item) => (
            <div key={item._id} className="owned-item">
              <div className="cart-item-image">
                <img src={item.img} alt={item.name} />
              </div>
              <div className="cart-item-name">
                <h3>{item.name}</h3>
              </div>
              <div className="cart-item-serial-key">
                <p>Serial Key: {item.serialKey}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No owned items yet.</p>
        )}
      </div>
    </div>
  );
}

export default User;
