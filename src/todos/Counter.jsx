import React, { useMemo, useState } from "react";
import { memo } from "react";

const Counter=()=>{
    const[count,setCount]=useState(0);
    const[countTwo,setCountTwo]=useState(10);

    const incrementOne=()=>{
        setCount(count+1)
    }
    const incrementTwo=()=>{
        setCountTwo(countTwo+10)
    }
    const isEven=useMemo(()=>{
        console.log(count);
        return count % 2===0
    },[count])
    return (
        <div className="text-center my-3">
            <h5 className="text-center" style={{color:"orange "}}>{isEven?"Twin":"Odd"}</h5>
            <button className="btn btn-success" onClick={incrementOne}>{`count-one : ${count}`}</button>
            <br />
            <br />
            <button className="btn btn-success" onClick={incrementTwo}>count-two : {countTwo}</button>
        </div>
    )
}
export default memo(Counter)