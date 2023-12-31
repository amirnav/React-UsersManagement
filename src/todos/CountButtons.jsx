import React, { memo } from "react";

const Countbutton=(props)=>{
    console.log("Button"+props.title);
    return (
        <div>
            <button className="btn btn-info" onClick={props.handleClick}>{`Increase${props.title}`}</button>
        </div>
    );
}
export default memo(Countbutton)