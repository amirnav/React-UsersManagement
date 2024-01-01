import React, { useEffect, useState } from 'react';
import style from '../style.module.css'
import { Link, useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import { jpAxios } from '../JpAxios';
import useTitle from '../hooks/useTitle';

const Users = ()=>{
    const navigate=useNavigate();
    const[users,setUsers]=useState([]);
    const [mainUsers,setMainUsers]=useState([]);

    const getUserService=()=>{
        jpAxios.get('/users').then(res=>{
            setUsers(res.data);
            setMainUsers(res.data);})
    }    

    const handleDelete=(itemId)=>{    
        swal({
            title: `Are you sure to delete ${itemId}?`,
            text: "you will not be able to recover this profile !",
            icon: "warning",
            buttons: true,
            dangerMode: true,            
          })
          .then((willDelete) => {
            if (willDelete) {
                jpAxios({
                    method:"DELETE",
                    url:`/users/${itemId}`
                }).then(res=>{
                    if (res.status===200){
                        const newUsers=users.filter(u=>u.id!==itemId);
                        setUsers(newUsers);
                        swal("Selcted user has been deleted!", {
                            icon: "success",
                            buttons:"Understand!"
                          });
                    }else{
                        swal("wrong!",{
                            icon:"error",
                            buttons:"Understand!"
                        });
                    }                    
                })              
            } else {
              swal("Selected profile is safe!",);
            }
          });
    }
    const handlesearch=(e)=>{
        setUsers(mainUsers.filter(u=>u.name.includes(e.target.value)))
    }
    useEffect(()=>{
        getUserService();
        
    },[]);

    useTitle("Users");

    return (
        <div className={`${style.item_content} mt-5 p-4 container-fluid`}>
            <h4 className="text-center"style={{color:"white",fontFamily:"arial",fontSize:"xx-large"}}>Users Management</h4>
            <div className="row my-2 mb-4 justify-content-between w-100 mx-0">                
                <div className="form-group col-10 col-md-6 col-lg-4">
                    <input type="text" className="form-control shadow" placeholder="Search" onChange={handlesearch}/>
                </div>
                <div className="col-2 text-start px-0">
                    <Link to="/user/add">
                    <button className="btn btn-success">
                        <i className="fas fa-plus text-light"></i>
                    </button>
                    </Link>
                </div>
            </div>
            {users.length ? (
                 <table className="table bg-light shadow">
                 <thead>
                     <tr>
                         <th>No.</th>
                         <th>Name</th>
                         <th>Username</th>
                         <th>Email</th>
                         <th>Operation</th>
                     </tr>
                 </thead>
                 <tbody>
                 {users.map(u => (                    
                    <tr key={u.id}>
                        <td>{u.id}</td>
                        <td>{u.name}</td>
                        <td>{u.username}</td>
                        <td>{u.email}</td>
                        <td>                            
                            <i
                             className="fas fa-edit text-warning mx-2 pointer"
                            onClick={()=>navigate(`/user/add/${u.id}`)}></i>                            
                            <i className="fas fa-trash text-danger mx-2 pointer"
                            onClick={()=>handleDelete(u.id)}></i>
                        </td>
                    </tr>                
                 ))}
                 </tbody>
             </table>
            ):(
                <h4 className='text-center text-info'>Please wait a moment!</h4>
            )}           
        </div>
    )
}
export default Users;