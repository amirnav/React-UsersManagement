import React, { useEffect, useState } from 'react';
import style from '../style.module.css'
import { jpAxios } from '../JpAxios';
import { Link,useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const Posts = ()=>{
    const navigate=useNavigate();
    const[posts,setPosts]=useState([]);
    const[mainPosts,setMainPosts]=useState([])
    useEffect(()=>{        
        jpAxios.get('/posts').then(res=>{
            setPosts(res.data);
            setMainPosts(res.data);

        }).catch(err=>{
            console.log(err);
        })
    },[])
    const handleDelete=(id)=>{
        swal({
            title: `Are you sure to delete ${id}?`,
            text: "you will not be able to recover this post !",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            
          })
          .then((willDelete) => {
            if (willDelete) {
                jpAxios({
                    method:"DELETE",
                    url:`/posts/${id}`
                }).then(res=>{
                    if (res.status===200){
                        const newPosts=posts.filter(u=>u.id!==id);
                        setPosts(newPosts);
                        swal("Selcted post has been deleted!", {
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
              swal("Selected post is safe!",);
            }
          });
    }
    const handleSearch=(e)=>{
        setPosts(mainPosts.filter(u=>u.title.includes(e.target.value)))
    }


    return (
        <div className={`${style.item_content} mt-5 p-4 container-fluid`}>
            <h4 className="text-center"style={{color:"white",fontFamily:"arial",fontSize:"xx-large"}}>Post Management</h4>
            <div className="row my-2 mb-4 jutify-content-between w-100 mx-0">
                <hr />
                <hr />                
                <div className="form-group col-10 col-md-6 col-lg-4">
                    <input type="text" className="form-control shadow" placeholder="Search" onChange={handleSearch}/>
                <div className="col-2 text-start px-0">
                    <Link to="/add/post">
                    <button className="btn btn-success">
                        <i className="fas fa-plus text-light"></i>
                    </button>
                    </Link>
                </div>
            </div>
            {posts.length ? (                
                 <tbody>
                 {posts.map(u => (
                    <>
                    <table className="table shadow"style={{color:"white"}}>
                    <thead>
                        <tr>
                            <th>Id.</th>
                            <th>User Id</th>
                            <th>title</th>
                            <th>body</th>                        
                        </tr> 
                        </thead>
                        </table> 
                        <table className='table bg-light shadow'>
                        <thead>       
                    <tr className='table bg-lightshadow-lg' key={u.id}>
                        <td>{u.id}</td>
                        <td>{u.userId}</td>
                        <td>{u.title}</td>
                        <td>{u.body}</td>
                        <td>                            
                            <i
                             className="fas fa-edit text-warning mx-2 pointer"
                            onClick={()=>navigate(`/add/post/${u.userId}`)}></i>                            
                            <i className="fas fa-trash text-danger mx-2 pointer"
                            onClick={()=>handleDelete(u.id)}
                            ></i>
                        </td>
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
        </div>
        
    )
    }


export default Posts;