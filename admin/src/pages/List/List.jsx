import React, { useContext } from 'react'
import './List.css'
import axios from "axios"
import {toast} from 'react-toastify'
import Sidebar from '../../components/Sidebar/Sidebar'
import { StoreContext } from '../../context/StoreContext'

const List = () => {

  const {list,removeFood,url} = useContext(StoreContext);
  
  return (
    <>
    <Sidebar/>
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item,index)=>{
          return(
            <div key={index} className="list-table-format">
              <img src={`${url}/images/`+item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>
              <p onClick={()=>removeFood(item._id)} className='cursor'>X</p>
            </div>
          )
        })}
      </div>
    </div>
    </>
  )
}

export default List
