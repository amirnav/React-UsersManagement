import React from 'react';
import style from '../style.module.css';
import Counter from './Counter'
import useTitle from '../hooks/useTitle';

const Todos = ()=>{
    useTitle("Todo")
    return (
        <div className={`${style.item_content} mt-5 p-4 container-fluid`}>
            <h4 className="text-center"style={{color:"white"}}>Tasks Management </h4>
            <Counter/>
        </div>
    )
    

}

export default Todos;