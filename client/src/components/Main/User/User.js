import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../../../utils/queries';
import './User.css';

function User() {
  const { loading, data } = useQuery(QUERY_ME);

  if (loading) {
    return <div>Loading...</div>;
  }

  const user = data.me;

  return (
    <div className="owned">
      <h2>Welcome back, {data.me.username} !</h2>
      <h3 className='o-items'>Owned Items:</h3>
      <div className="owned-items">
        {user && user.ownedItems && user.ownedItems.length > 0 ? (
          user.ownedItems.map((item) => (
            <div key={item._id} className="owned-item">
              <div className="owned-item-image">
                <img src={item.img} alt={item.name} />
              </div>
              <div className="owned-item-name">
                <h3>{item.name}</h3>
              </div>
              <div className="owned-item-serial-key">
                <p><span>Serial Key:</span> {item.serialKey}</p>
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
