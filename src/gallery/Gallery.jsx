import React, { useEffect, useState } from 'react';
import style from '../style.module.css'
import { useNavigate } from 'react-router-dom';
import { jpAxios } from '../JpAxios';
import useTitle from '../hooks/useTitle';

const Gallery = ()=>{
    const navigate=useNavigate();
    const[gallery,setGallery]=useState([]);
    const getGalleryService=()=>{
        jpAxios.get(`/photos`).then(res=>{
            setGallery(res.data)
        })
    }
    useEffect(()=>{
        getGalleryService();
    },[])
    
    useTitle("Galleries")

    return (
        <div className={`${style.item_content} mt-5 p-4 container-fluid`}>
            <h4 className="text-center"style={{color:"white",fontFamily:"arial",fontSize:"xx-large"}}>Gallery Management</h4>
            <div className="row my-2 mb-4 jutify-content-between w-100 mx-0">
                <hr />
                <hr />    
                <h1>Salam</h1>            
                {/* <div className="form-group col-10 col-md-6 col-lg-4">
                    <input type="number" className="form-control shadow" placeholder="Search by user Id" onChange={(e)=>setUid(e.target.value)} value={uId}/>
                <div className="col-2 text-start px-0">
                    <Link to="/post/add">
                    <button className="btn btn-success">
                        <i className="fas fa-plus text-light"></i>
                    </button>
                    </Link>
                </div>
            </div> */}
            {gallery.length ? (                
                 <tbody>
                 {gallery.map(u => (
                    <>
                    <table className="table shadow"style={{color:"white"}}>
                    <thead>
                        <tr>
                            <th>Album Id</th>
                            <th>id</th>
                            <th>title</th> 
                            <th>url</th> 
                            <th>thumbnail url</th>                        
                        </tr> 
                        </thead>
                        </table> 
                        <table className='table bg-light shadow'>
                        <thead>       
                    <tr className='table bg-lightshadow-lg' key={u.albumId}>
                        
                        <td className='text-primary' style={{cursor:"pointer"}} onClick={()=>setGallery(u.id)}>{u.albumId}</td>
                        <td>{u.id}</td>
                        <td>{u.title}</td>
                        <img src={u.url} height="100px" width="100px"></img>
                        <img src={u.thumbnailUrl} width="50px" height="50px"></img>
                        
                        <td>                            
                            <i
                             className="fas fa-edit text-warning mx-2 pointer"
                            onClick={()=>navigate(`/post/add/${u.id}`)}></i>                            
                            <i className="fas fa-trash text-danger mx-2 pointer"
                            ></i>
                            {/* <i className='fas fa-comment text-success m-2 pointer'
                            onClick={()=>navigate(`/post/comment/${u.id}`)}
                            ></i> */}
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

export default Gallery;