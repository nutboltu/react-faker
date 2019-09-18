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

const TextField = ({
  label,
  innerRef,
  multiline = false
}) => (<div style={fieldStyle}>
    <label style={labelStyle}>{label}</label>
    {
      multiline ?
        <textarea ref={innerRef} style={textAreaStyle}></textarea>
        : <input  type="text" ref={innerRef} style={inputStyle} />
    }
</div>);

export default TextField;

