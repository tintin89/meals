import React,{useRef} from 'react';
import './ChooseFood.css';
import {tags} from '../../utility/utility';
import Tag from './Tag/Tag';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import IconButton from '@material-ui/core/IconButton';


function ChooseFood() {
   const ref = useRef(null);


    const scroll = (scrollOffset) => {
        ref.current.scrollLeft += scrollOffset;
      };


    return (
        <>
        <div ref={ref} className="chooseFood">
            {
                tags.map((t,index)=>
                 <Tag key={index} index={index} {...t}/>
                )
            }
        </div>
        <div className="buttonsControl">
        <IconButton onClick={() => scroll(-130)}><NavigateBeforeIcon/></IconButton>
        <IconButton onClick={() => scroll(130)}><NavigateNextIcon/></IconButton>
              
        </div>
        </>
    )
}

export default ChooseFood
