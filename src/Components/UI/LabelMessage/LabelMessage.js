import './LabelMessage.css';

function LabelMessage(props) {
    return (
        <div style={{color:props.colorF,fontSize:props.sizeF,textAlign:props.textA,marginTop:props.mTop}} className="labelMessage">
         {props.message}
        </div>
    )    
}


export default LabelMessage;