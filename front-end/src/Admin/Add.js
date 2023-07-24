import React, { useState } from 'react';
import axios from 'axios';

const API = "http://127.0.0.1:8000/api/get-product";

const Add = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    id_type: "",
    description: "",
    unit_price:"",
    promotion_price:"",
    image:"",
    unit:""
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post(API, newProduct);
      setNewProduct({
          name: "",
          id_type: "",
          description: "",
          unit_price:"",
          promotion_price:"",
          image:"",
          unit:"",
      });

      alert('Thêm mới thành công!');
      setTimeout(() => {
        window.location = '/Admin'; // Replace with your desired URL
      }, 100);
    } catch (error) {
      alert('Thêm mới không thành công:', error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <div className="card-body">
              <div className="form-group">
                <label>Name product</label>
                <input type="text" className="form-control" value={newProduct.name} onChange={handleInputChange} name="name" />
              </div>
              <div className="form-group">
                <label>Image</label>
                <input type="text" className="form-control" value={newProduct.image} onChange={handleInputChange} name="image" />
              </div>
              <div className="form-group">
                <label>Description</label>
                <input type="text" className="form-control" value={newProduct.description} onChange={handleInputChange} name="description" />
              </div> 
              <div className="form-group">
                <label>Unit price</label>
                <input type="text" className="form-control" value={newProduct.unit_price} onChange={handleInputChange} name="unit_price" />
              </div>
              <div className="form-group">
                <label>Promotion price</label>
                <input type="text" className="form-control" value={newProduct.promotion_price} onChange={handleInputChange} name="promotion_price" />
              </div>
              <div className="form-group">
                <label>Unit</label>
                <input type="text" className="form-control" value={newProduct.unit} onChange={handleInputChange} name="unit" />
              </div><br></br>
              <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Add</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
