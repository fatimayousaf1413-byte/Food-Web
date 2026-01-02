import React, { useEffect, useState } from 'react'
import "./Add.css"
import upload from '../../assets/upload.png'
import axios from "axios"
import { toast } from 'react-toastify'

const Add = () => {
  const [image, setimage] = useState(false);
  const [data, setdata] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  })

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setdata(data => ({ ...data, [name]: value }))
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", Number(data.price));
      formData.append("category", data.category);
      formData.append("image", image)
      const response = await axios.post("http://localhost:3000/api/food/create-food", formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      )
      if (response.data.success) {
        setdata({
          name: "",
          description: "",
          price: "",
          category: "Salad",
        })
        setimage(false)
        toast.success(response.data.message)
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      }
    }
  }

  return (
    <div className='add' >
      <form onSubmit={onSubmitHandler} className='flex-col'>
        <div className='add-img-upload flex-col' >
          <p>Upload Image</p>
          <input className='image' onChange={(e) => setimage(e.target.files[0])} type="file" id='image' required />
          <label htmlFor="">
            <img style={{ position: "relative", width: "25%" }} src={image ? URL.createObjectURL(image) : upload} alt="" />
          </label>
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea onChange={onChangeHandler} value={data.description} name="description" rows='6' placeholder='Write ontent here' required></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col ">
            <p>Product category</p>
            <select onChange={onChangeHandler} value={data.category} name="category" >
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwitch">Sandwitch</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product price</p>
            <input type="Number" onChange={onChangeHandler} name='price' value={data.price} placeholder='$20' />
          </div>
        </div>
        <button type='submit' className='add-btn' >ADD</button>
      </form>
    </div>
  )
}

export default Add