import React from 'react';
import Proptypes from 'prop-types';

const itemStyle = {
  padding: '5px',
};

const itemLabelStyle = {
  padding: '5px',
};

const List = ({ items = [], onSkip }) => {
  return (
    <>
      {items.map(({ url, method, skip }, index) => (
        <details key={index}>
          <summary>MOCK {index}</summary>
          <div style={itemStyle}>
            <span style={itemLabelStyle}>Enabled</span>
            <input
              type="checkbox"
              checked={!skip}
              onChange={() => onSkip(url, method)}
            />
          </div>
          <div style={itemStyle}>
            <span style={itemLabelStyle}>Method</span>
            <span>{method}</span>
          </div>
          <div style={itemStyle}>
            <span style={itemLabelStyle}>URL</span>
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
