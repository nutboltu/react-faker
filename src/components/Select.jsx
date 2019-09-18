import React from 'react';

const fieldStyle = {
  display: 'flex',
  justifyContent: 'start',
  flexDirection: 'column',
  marginBottom: '10px',
}

const labelStyle = {
  marginBottom: '5px',
}


const Select = ({
  label,
  innerRef,
  options = [],
}) => (<div style={fieldStyle}>
    <label style={labelStyle}>{label}</label>
    <select ref={innerRef}>
          {
            options.map((item, index) => (
              <option key={index} value={item}>{item}</option>
            ))
          }
    </select>
</div>);

export default Select;

