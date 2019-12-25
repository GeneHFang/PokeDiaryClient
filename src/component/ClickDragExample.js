import React from 'react';
import clickDrag from 'react-clickdrag';


const clickDragComp = (props) =>{


    return (
        <div>
            This should be able to be click dragged?
        </div>
    )



}

export default clickDrag(clickDragComp, {touch: true});