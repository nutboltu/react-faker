import React from 'react';

const ApiItem = ({
  url,
  method,
  status,
  skip,
  onSkip,
}) => (
  <details >
      <summary>{url}</summary>

        {method} {status}
        <input type="checkbox" checked={!skip} onChange={() => onSkip(url)}/>
  </details>
);

export default ApiItem;
