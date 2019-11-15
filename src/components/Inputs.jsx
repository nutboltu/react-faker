import React from 'react';
import PropTypes from 'prop-types';

const fieldStyle = {
  display: 'flex',
  justifyContent: 'start',
  flexDirection: 'column',
  marginBottom: '10px',
};

const labelStyle = {
  marginBottom: '5px',
};

const inputStyle = {
  padding: '5px',
  border: '1px solid #ddd',
  borderRadius: '5px',
};

const textAreaStyle = {
  ...inputStyle,
  minHeight: '60px',
  resize: 'none',
};

export const TextField = ({ label, innerRef, multiline = false }) => (
  <div style={fieldStyle}>
    <label style={labelStyle}>{label}</label>
    {multiline ? (
      <textarea ref={innerRef} style={textAreaStyle}></textarea>
    ) : (
      <input type="text" ref={innerRef} style={inputStyle} />
    )}
  </div>
);

TextField.propTypes = {
  label: PropTypes.string,
  innerRef: PropTypes.any,
  multiline: PropTypes.bool,
};

export const Select = ({ label, innerRef, options = [] }) => (
  <div style={fieldStyle}>
    <label style={labelStyle}>{label}</label>
    <select ref={innerRef}>
      {options.map((item, index) => (
        <option key={index} value={item}>
          {item}
        </option>
      ))}
    </select>
  </div>
);

Select.propTypes = {
  label: PropTypes.string,
  innerRef: PropTypes.any,
  options: PropTypes.array,
};

const buttonStyle = {
  color: 'white',
  margin: '5px',
  border: 'none',
  padding: '5px 10px',
  borderRadius: '2px',
  fontSize: '12px',
  maxHeight: '35px',
};

const primaryBtnStyle = {
  background: '#527dc3',
};

const dangerBtnStyle = {
  background: '#E91E63',
};

export const Button = ({ btnStyle = 'primary', onClick, text, style }) => (
  <button
    onClick={onClick}
    style={{
      ...buttonStyle,
      ...(btnStyle === 'primary' ? primaryBtnStyle : dangerBtnStyle),
      ...style,
    }}
  >
    {text}
  </button>
);

Button.propTypes = {
  btnStyle: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.string,
  style: PropTypes.object,
};
