import React,{useState} from 'react';
import './Tag.css';
import {useSelector,useDispatch} from 'react-redux';
import {updateChoosenFoods} from '../../../store/actions/actionsRestaurants';


const mapState=({restaurantsR})=>({
    choosenFoods:restaurantsR.choosenFoods
})

function Tag({name,picture,index}) {
    const dispatch = useDispatch();
    const {choosenFoods} = useSelector(mapState);
    const [choosen,setChoosen] = useState(false);


    const handleChoosen = ()=>{
        setChoosen(prevState=>!prevState);
        if(choosen){
         const  temp = choosenFoods;
         const i = temp.indexOf(name);
         temp.splice(i,1);
         dispatch(updateChoosenFoods(temp));
        }else{
            const temp = choosenFoods;
            temp.push(name);
            dispatch(updateChoosenFoods(temp));
        }
    }
  //  
    return (
        <div onClick={()=>handleChoosen()}  className="tagToChoose">           
            <img style={{filter:choosen && "grayscale(0)"}} alt={name} src={picture}/>
            <span 
            className={`spanTag ${choosen && "choosen"} ` }>
                {name}</span>
        </div>
    )
}

export default Tag
