import React from 'react'
import './Backdrop.css'

function Backdrop(props) {
    return (
        props.show ? <div className="backdrop">{props.children}</div> : null
    )
}

export default Backdrop