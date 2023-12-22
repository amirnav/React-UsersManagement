import React, { useEffect, useState } from 'react';
import style from '../style.module.css'
import { useParams, Outlet, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import { jpAxios } from '../JpAxios';



const AddUser = ()=>{
    const {userId}=useParams();
    const navigate=useNavigate();
    const [data,setData]=useState({
        name:"",
        username:"",
        email:"",
        address:{
            city:"",
            street:"",
            suite:"",
            zipcode:"",
        }
    })

    const setUserService=async()=>{
        const res=await jpAxios.post('/users',data);
        if (res){
            console.log(res);
                swal(`Create ${res.data.name} is successful`,{
                    icon:"success",
                    buttons:"Understand!"
                });
        }
    }
    const updateUserService=async()=>{
        const res=await jpAxios.put(`/users/${userId}`,data);
        if (res){
            console.log(res);
            swal(`Edit ${res.data.name} is successful`,{
                icon:"success",
                buttons:"Understand!"
            });
        }
    }
    const handleAddUser=(e)=>{
        e.preventDefault();

        if(!userId){        
            setUserService();
        }else{
            updateUserService();
        }    
    }
    useEffect(()=>{
        jpAxios.get(`/users/${userId}`).then(res=>{
           setData({
            name:res.data.name,
            username:res.data.username,
            email:res.data.email,
            address:{
                street:res.data.address.street,
                city:res.data.address.city,
                suite:res.data.address.suite,
                zipcode:res.data.address.zipcode
            }
           })
        });
    },[])
    return (
        <div className={`${style.item_content} mt-2 p-8 container-fluid container`}>            
            <div className='row justify-content-center mt-3'>
            <div>           
            <h4 className="align-control"style={{color:"white",fontSize:"x-large"}}>{userId ? "Edit User":"Add User"} </h4>
            </div>   
            {userId?<div>
            <img src="/assets/images/edit-user-icon.png" width="100px" height="100px" alt=""  />
            </div> :<div>
            <img src="/assets/images/add-user-icon.png" width="100px" height="100px" alt="" />
            </div> }                    
                <form onSubmit={handleAddUser} className='col-12 col-md-8 bg-light rounded shadow-lg p-3'>
                    <div>
                        <label className="form-label">Full name:</label>
                        <input type="text" className="form-control" value={data.name} onChange={(e)=>setData({...data,name:e.target.value})
                        }/>                        
                    </div>
                    <div className="mb-3">
                        <label className="form-label">User name:</label>
                        <input type="text" className="form-control" value={data.username} onChange={(e)=>setData({...data,username:e.target.value})}/>                        
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email:</label>
                        <input type="text" className="form-control" value={data.email} onChange={(e)=>setData({...data,email:e.target.value})}/>                        
                    </div>
                    <div className=" mb-3">
                        <label className="form-label">Address:</label>
                            <div className="mb-3">
                                <input type="text" className="form-control"  placeholder='city' value={data.address.city} onChange={(e)=>
                                setData({...data,address:{...data.address,city:e.target.value}})}/>                        
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control"  placeholder='street' value={data.address.street} onChange={(e)=>
                                setData({...data,address:{...data.address,street:e.target.value}})}/>                        
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control" placeholder='suite' value={data.address.suite} onChange={(e)=>
                                setData({...data,address:{...data.address,suite:e.target.value}})}/>                        
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control" placeholder='zip code' value={data.address.zipcode} onChange={(e)=>
                                setData({...data,address:{...data.address,zipcode:e.target.value}})} />                        
                            </div>                                     
                    </div>               
                    <div me='col-12 align-control'>                        
                        <button type='button' className="btn btn-danger ms-5" onClick={()=>navigate("/")}>Return
                        </button>                       
                        <button type='submit' className="btn btn-success ms-5">{userId?"Edit":"Add"}
                        </button>
                    </div>  
                    {/* <Outlet/>                                                                        */}
                </form>
            </div>           
        </div>
    )
}
export default AddUser;