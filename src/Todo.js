import React from 'react'
import { useState } from 'react';

function Todo() {
    const [list,setList] = useState([])
    const [message,setMessage] = useState({
        text:'',
        id:'',
    })
    const [editing,setEditing] = useState({
      id:'',
      isEditing:false
    })
    const changeHandel = (e)=>{
           setMessage({...message,text:e.target.value})
    }
    const submitMe =(e) =>{
         e.preventDefault();
         let newTodo={
          text:message.text,
          id:new Date().getTime().toString(),
         };
         setList([...list,newTodo])
         setMessage({
          text:'',
          id:''
         })
      }

      const handelDelete =(id)=>{
        let newTodos = list.filter((eachItem)=>{
          return eachItem.id !==id
        })
        setList(newTodos)
      }
      const changeEditState = (id) =>{
        console.log(id)
        setEditing({
          ...editing,
          id:id,
          isEditing:true
        })
        let edittableItem = list.find((eachItem)=>eachItem.id === id)
        setMessage({
          ...message,
          text:edittableItem.text,
          id:edittableItem.id
        })
          console.log(edittableItem)
      }
      const handelEdit =(e)=>{
           e.preventDefault()
           let newTodos = list.map((eachItem)=>{
             if (eachItem.id === editing.id){
              return{
                text:message.text,
                id:editing.id,
              }
             }else{
              return eachItem;
             }
           })
             setList(newTodos)
             setMessage({
              text:'',id:''
             })
             setEditing({
              
              id:'',
              isEditing:false
             })
      }
  return (
    <center>
      <form onSubmit={submitMe}>
      <input type='text' name='text' id='text'  placeholder='Enter Your Text' 
      value={message.text} onChange={changeHandel}  />
      
      {editing.isEditing ? (
        <button onClick={handelEdit} type='submit'>Edit</button>) : 
        (<button onClick={submitMe} type='submit'>Add</button>
      )

      }
      </form>
      <hr/>

      {
       list.length === 0 && <h1>There is no items </h1>

      }
      <ul>
      {list.map((eachItem)=>{
        const {id,text} = eachItem
        return <li key={id}>
             <span>{text}</span>
             <button onClick={()=>changeEditState(id)}>Edit</button>
             <button onClick={()=>handelDelete(id)}>Delete</button>
        </li>
      })}
      </ul>
      
     
    </center>
  )
}

export default Todo
