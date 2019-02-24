import React from 'react';

export default ({ name, id, thumbnail, active }) => (
  <li>
    <img src={thumbnail} width='50' height='50' alt={name} />
    {name}
  </li>
);
