import React from 'react';
import style from '../style.module.css';
import Parent from './Parent'

const Todos = ()=>{

    return (
        <div className={`${style.item_content} mt-5 p-4 container-fluid`}>
            <h4 className="text-center"style={{color:"white"}}>Tasks Management </h4>
            <Parent/>
        </div>
    )

}

export default Todos;