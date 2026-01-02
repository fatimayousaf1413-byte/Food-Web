import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios';
import { toast } from 'react-toastify';

const List = () => {
  const [List, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get("http://localhost:3000/api/food/get-all-foods")
    console.log(response.data)
    if (response.data.success) {
      setList(response.data.foods)
    }
    else {
      toast.error("Error in getting list foods")
    }
  }

  const removeFood = async (id) => {
    try {
      const remove = await axios.delete(`http://localhost:3000/api/food/delete-food/${id}`)
      await fetchList();
      if (remove.data.success) {
        toast.success(remove.data.message)
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      }
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className='list add flex-col' >
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {List.map((item, index) => {
          return (
            <div key={index} className='list-table-format'>
              <img src={`http://localhost:3000/uploads/${item.image}`} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p className='cursor' onClick={() => removeFood(item._id)}>X</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List