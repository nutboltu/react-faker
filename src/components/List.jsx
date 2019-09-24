import React from 'react';

const tdStyle = {
  border: '1px solid #ddd',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  padding: '12px 5px',
}

const headThStyle = {
  paddingTop: '12px',
  paddingBottom: '12px',
  textAlign: 'left',
  backgroundColor: '#527dc3',
  color: 'white',
  border: '1px solid #ddd'
}

const tableStyle = {
  borderCollapse: 'collapse',
}

const List = ({
  items = [],
  onSkip,
}) => {
  return (
    <table style={tableStyle}>
      <thead>
        <tr>
            <th style={headThStyle}>On</th>
            <th style={headThStyle}>URL</th>
            <th style={headThStyle}>Method</th>
        </tr>
      </thead>
      <tbody>
      {
          items.map(({url, method, status, skip}) => (
            <tr>
              <td style={tdStyle}><input type="checkbox" checked={!skip} onChange={() => onSkip(url)}/></td>
              <td style={tdStyle}>{url}</td>
              <td style={tdStyle}>{method}</td>
            </tr>
        ))
      }
      </tbody>
    </table>
  )
}
export default List;
