import React from 'react';


const PokeCard = (props) => {

    return(
        <div draggable onDragStart={props.dragData} className="draggable" id={`${props.id}-card`} onClick={props.clickHandle}>
            {props.name.toUpperCase()}<br></br>
            <img draggable={false} src={props.imgURL}/>
        </div>
    )

}


export default PokeCard;