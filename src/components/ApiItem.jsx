import React from 'react';

const ApiItem = ({
  url,
  method,
  status,
}) => (
  <details >
      <summary>{url}</summary>

        {method} {status}
  </details>
);

export default ApiItem;
