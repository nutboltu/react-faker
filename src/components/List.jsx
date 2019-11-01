import React from "react";
import Proptypes from "prop-types";

const tdStyle = {
  border: "1px solid #ddd",
  overflow: "hidden",
  textOverflow: "ellipsis",
  padding: "12px 5px"
};

const headThStyle = {
  paddingTop: "12px",
  paddingBottom: "12px",
  textAlign: "left",
  backgroundColor: "#527dc3",
  color: "white",
  border: "1px solid #ddd"
};

const tableStyle = {
  borderCollapse: "collapse"
};

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
  onSkip: Proptypes.func
};

export default List;
