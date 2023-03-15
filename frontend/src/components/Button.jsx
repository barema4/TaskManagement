import React from 'react'
import PropTypes from 'prop-types'

export const Button = ({color, text, onClick, disabled}) => {
  return (

    <button onClick={onClick} style={{background: color}} className='btn' disabled={disabled}>{text}</button>
  ) 
}

Button.defaultProps = {
    color: 'steelblue'
}

Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func
}