import React from "react";
import './blockitem.css'

const BlockItem = (props) => {
    return(
        <div className="propItem">{props.num}</div>
    )
}

export default BlockItem