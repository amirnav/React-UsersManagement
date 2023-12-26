import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { jpAxios } from "../JpAxios";
import style from '../style.module.css';

const Comment=()=>{
    const{id}=useParams();
    const[comments,setComments]=useState({
        postId:"",
        id:"",
        name:"",
        email:"",
        body:"",
    })
    useEffect(()=>{
        jpAxios.get(`comments/${id}`,id).then(res=>{
            setComments({
                postId:res.data.postId,
                id:res.data.id,
                name:res.data.name,
                email:res.data.email,
                body:res.data.body,
            })
        })
    },)

return(
    <div className={`${style.item_content} mt-5 p-4 container-fluid`}>
            <h4 className="text-center"style={{color:"white",fontFamily:"arial",fontSize:"xx-large"}}>Post Management</h4>
            <div className="row my-2 mb-4 jutify-content-between w-100 mx-0">
                <hr />
                <hr /> 
            </div>
            {comments.length ? (                
                 <tbody>
                 {comments.map(u => (
                    <>
                    <table className="table shadow"style={{color:"white"}}>
                    <thead>
                        <tr>
                            <th>Post Id.</th>
                            <th>Id</th>
                            <th>Name:</th>
                            <th>Email:</th>
                            <th>Body:</th>                        
                        </tr> 
                        </thead>
                        </table> 
                        <table className='table bg-light shadow'>
                        <thead>       
                    <tr className='table bg-lightshadow-lg' key={u.postId}>
                        <td>{u.postId}</td>
                        <td>{u.id}</td>
                        <td>{u.name}</td>
                        <td>{u.email}</td>
                        <td>{u.body}</td>
                      
                    </tr>                    
                    </thead>
                    </table>
                    </>                
                 ))}
                 </tbody>            
            ):(
                <h4 className='text-center text-info'>Please wait a moment!</h4>
            )}           
        </div>       
)
}
export default Comment;