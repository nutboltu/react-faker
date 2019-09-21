import React from 'react';

const ApiItem = ({
  url,
  method,
  status,
  skip,
  onSkip,
}) => (
  <div>
     <div>{url}</div>
     <div><input type="checkbox" checked={!skip} onChange={() => onSkip(url)}/></div>
  </div>
);

export default ApiItem;
