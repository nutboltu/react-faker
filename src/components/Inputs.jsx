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
}

const textAreaStyle = {
  minHeight: '60px',
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


