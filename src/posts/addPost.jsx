import React, { useEffect, useState } from "react";
import { Navigate, useParams,useNavigate } from "react-router-dom";
import style from '../style.module.css'
import swal from "sweetalert";
import { jpAxios } from "../JpAxios";

const AddPost=()=>{
    const{id}=useParams();
    const navigate=useNavigate();    
    const[data,setPosts]=useState({
        userId:"",   
        id:"",     
        title:"",
        body:"",
    })
    const setPostService=async()=>{
        const res=await jpAxios.post('/posts',data);
        if (res){
            console.log(res);
                swal(`Create ${res.data.id} is successful`,{
                    icon:"success",
                    buttons:"Understand!"
                });
        }   
    }
    const updatePostService=async()=>{
        const res=await jpAxios.put(`/posts/${id}`,data);
        if (res){
            console.log(res);
            swal(`Edit ${res.data.id} is successful`,{
                icon:"success",
                buttons:"Understand!"
            });
        }
    }   
    const handleAddPost=(e)=>{
        e.preventDefault();
        if(!id){        
            setPostService();
        }else{
            updatePostService();
        } 
    }
    useEffect(()=>{
        jpAxios.get(`/posts/${id}`).then(res=>{
           setPosts({
            userId:res.data.userId,
            id:res.data.id,
            title:res.data.title,
            body:res.data.body,
           })
        });
    },[])
    return (
        <div className={`${style.item_content} mt-2 p-8 container-fluid container`}>            
            <div className='row justify-content-center mt-3'>
            <div>           
            <h4 className="align-control"style={{color:"white",fontSize:"x-large"}}>{id ? "Edit Post":"Add Post"} </h4>
            </div>   
            {id?<div>
            <img src="/assets/images/edit-user-icon.png" width="100px" height="100px" alt=""  />
            </div> :<div>
            <img src="/assets/images/add-user-icon.png" width="100px" height="100px" alt="" />
            </div> }                    
                <form onSubmit={handleAddPost} className='col-12 col-md-8 bg-light rounded shadow-lg p-3'>
                    <div>
                        <label className="form-label">No.</label>
                        <input type="text" className="form-control" value={data.id} onChange={(e)=>setPosts({...data,id:e.target.value})
                        }/>                        
                    </div>
                    <div className="mb-3">
                        <label className="form-label">User Id:</label>
                        <input type="text" className="form-control" value={data.userId} onChange={(e)=>setPosts({...data,userId:e.target.value})}/>                        
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Title:</label>
                        <input type="text" className="form-control" value={data.title} onChange={(e)=>setPosts({...data,title:e.target.value})}/>                        
                    </div>
                    <div className=" mb-3">
                        <label className="form-label">Body:</label>
                        <input type="text" className="form-control" value={data.body} onChange={(e)=>setPosts({...data,body:e.target.value})}/>                           
                    </div>               
                    <div me='col-12 align-control'>                        
                    <button type='button' className="btn btn-danger ms-5" onClick={()=>navigate("/post")}>Return
                        </button>                       
                        <button type='submit' className="btn btn-success ms-5">{id?"Edit":"Add"}
                        </button>
                    </div>  
                    {/* <Outlet/>                                                                        */}
                </form>
            </div>           
        </div>
    )
}
export default AddPost;

