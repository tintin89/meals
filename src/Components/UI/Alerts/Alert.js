import React from 'react';
import './Alert.css';

function Alert(props) {
    return (
        <div className="alertW">
            <p>Are you sure to delete this restaurant?</p>
            <div className="buttonsAlert">
              <button onClick={()=>props.handleDeleteR()}>Yes</button>
              <button onClick={()=>props.cancelDelete()}>No</button>
            </div>
        </div>
    )
}

export default Alert
