import React from 'react';
import Proptypes from 'prop-types';

const List = ({ items = [], onSkip }) => {
  return (
    <>
      {items.map(({ url, method, skip }, index) => (
        <details key={index}>
          <summary>MOCK {index}</summary>
          <div>
            <span>Enabled</span>
            <input
              type="checkbox"
              checked={!skip}
              onChange={() => onSkip(url, method)}
            />
          </div>
          <div>
            <span>Method</span>
            <span>{method}</span>
          </div>
          <div>
            <span>URL</span>
            <span>{url}</span>
          </div>
        </details>
      ))}
    </>
  );
};

List.propTypes = {
  items: Proptypes.array,
  onSkip: Proptypes.func,
};

export default List;
