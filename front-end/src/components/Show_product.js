import React, { useState, useEffect } from 'react';
import { Link} from 'react-router-dom';
import '../style/Show.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const Show = () => {
  const [data, setData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/get-product');
      setData(response.data);
      setSearchResults(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="container">
      <br />
      <h3 className="colection">SẢN PHẨM HOT CỦA LAZADA</h3>
      <br />
      <div className="row">
        {searchResults.map((e) => (
          <div className="col-md-3" key={e.id}>
            <div className="card">
              <img src={`http://localhost:8000/source/image/product/${e.image}`} alt={e.name} className="card-img-top" />
              <div className="card-body">
                <h4 className="card-title">{e.name}</h4>
                <p className="card-text">{e.description}</p>
                <p className="card_price"> {e.unit_price}</p>
                <del className="card_price"> {e.promotion_price}</del>
                <br></br><br></br>
                <div className="function">
                  <button className='button'>Mua ngay</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Show;
