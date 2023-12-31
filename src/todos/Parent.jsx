import React, { useCallback, useState } from "react";
import Title from "./Title";
import Countbox from "./CountBox"
import Countbutton from "./CountButtons"
import { memo } from "react";

const Parent=()=>{
    const [title,setTitle]=useState("Hello everyone!")
    const [count,setCount]=useState(0)
    const [count2,setCount2]=useState(5)

    const handleSetFirstCount=useCallback(()=>{
        setCount(count+1)
    },[count])
    const handleSetSecondCount=useCallback(()=>{
        setCount2(count2+1)
    },[count2])
    return (
        <div>        
            <Title title={title} />
            <Countbox title="Set 1" count={count}/>
            <Countbutton title="Set 1" handleClick={handleSetFirstCount} />
            <Countbox title="Set 2" count={count2}/>
            <Countbutton title="Set 2" handleClick={handleSetSecondCount} />        
        </div>    
    )
    
}
export default memo(Parent);