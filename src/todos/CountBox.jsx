import React from "react";
import { memo } from "react";

const Countbox=(props)=>{
    console.log("View"+props.title);
    return (
        <div className="text" style={{color:"white"}}>
            <span>{props.title+":"+props.count}</span>
        </div>
    )
}
export default memo(Countbox)

