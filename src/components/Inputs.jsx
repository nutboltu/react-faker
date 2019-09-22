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

const inputStyle = {
  padding: '5px',
  border: '1px solid #ddd',
  borderRadius: '5px',
}

const textAreaStyle = {
  ...inputStyle,
  minHeight: '60px',
  resize: 'none',
}

export const TextField = ({
  label,
  innerRef,
  multiline = false,
  min,
  max,
}) => (<div style={fieldStyle}>
    <label style={labelStyle}>{label}</label>
    {
      multiline ?
        <textarea ref={innerRef} style={textAreaStyle}></textarea>
        : <input  type="text" ref={innerRef} style={inputStyle} />
    }
</div>);

export const RangeField = ({
  label,
  innerRef,
  min = 0,
  max = 3,
}) => (<div style={fieldStyle}>
    <label style={labelStyle}>{label}</label>
    <input  type="range" ref={innerRef}  min={min} max={max} />
</div>);


export const Select = ({
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


const buttonStyle = {
  color: 'white',
  margin: '5px',
  border: 'none',
  padding: '5px 10px',
  borderRadius: '2px',
  fontSize: '12px',
  maxHeight: '35px',
}

const primaryBtnStyle = {
  background: '#527dc3',
}

const dangerBtnStyle = {
  background: '#E91E63',
}

export const Button = ({
  btnStyle='primary',
  onClick,
  text,
  style
}) => (
    <button
      onClick={onClick}
      style={{
        ...buttonStyle,
        ...( btnStyle === 'primary' ? primaryBtnStyle : dangerBtnStyle),
        ...style,
      }}
    >
      {text}
    </button>
)