import React, { useContext } from 'react';
import { MainContext } from './contexts/MainContext';
import Gallery from './gallery/Gallery';
import Posts from './posts/Posts';
import style from './style.module.css'
import Todos from './todos/Todos';
import Users from './users/Users';
import  {Route, Routes } from 'react-router-dom';
import AddUser from './users/addUser';
import EditDeskUsers from './users/EditDeskUsers';
import AddPost from './posts/addPost2';
import EditDeskPost from './posts/EditskPost';
import Comment from './posts/comments';


const Content = ()=>{
    const {showMenu,setShowMenu} = useContext(MainContext)
    const handleShowMenu = (event)=>{
        event.stopPropagation()
        setShowMenu(!showMenu)
        console.log(showMenu);
    }

    return (
        <div className={style.content_section} onClick={()=>{setShowMenu(false)}}>
            <i className={`${style.menu_button} fas fa-bars text-dark m-2 pointer`} 
            onClick={handleShowMenu}
            ></i>             
                    <Routes>
                        <Route path='*' element={<Users/>}/>
                        <Route path='/user' element={<Users/>} />
                        <Route path='/user/add' element={<AddUser/>}>
                            <Route path=':userId/' element={<EditDeskUsers/>} />
                        </Route>

                        <Route path='/post' element={<Posts/>} />
                        <Route path='/post/add' element={<AddPost/>}>
                            <Route path=':id/'/>
                        </Route>

                        <Route path='/comments/:id/' element={<Comment/>}/>
                        <Route path='/gallery' element={<Gallery/>} />                            
                        <Route path='/todo' element={<Todos/>} />
                     
                        
                    </Routes>                 
        </div>
    )
}
export default Content;