import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import ProductDetail from "./ProductDetail";

export const Shopping = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    getproduct();
    loadCartItems();
  }, []);

  const addShopping = async () => {
    try {
      const newItem = {
        name: product.name,
        image: product.image,
        unit_price: product.unit_price,
        promotion_price: product.promotion_price,
      };
      await axios.post("http://127.0.0.1:8000/api/get-product", newItem);
      setCartItems([...cartItems, newItem]);
      console.log("Thêm vào giỏ hàng thành công");
    } catch (error) {
      console.log("Lỗi khi thêm vào giỏ hàng:", error);
    }
  };

  const removeItemFromCart = async (item) => {
    try {
      await axios.delete(`https://63a5721a318b23efa793a770.mockapi.io/api/Type_Product/${item.id}`);
      const updatedItems = cartItems.filter((cartItem) => cartItem.id !== item.id);
      setCartItems(updatedItems);
      console.log("Xóa khỏi giỏ hàng thành công");
    } catch (error) {
      console.log("Lỗi khi xóa khỏi giỏ hàng:", error);
    }
  };

  const getproduct = async () => {
    try {
      const response = await axios.get(`https://63a5721a318b23efa793a770.mockapi.io/api/produce/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.log("Lỗi khi lấy sản phẩm:", error);
    }
  };

  const loadCartItems = async () => {
    try {
      const response = await axios.get("https://63a5721a318b23efa793a770.mockapi.io/api/Type_Product");
      setCartItems(response.data);
    } catch (error) {
      console.log("Lỗi khi tải giỏ hàng:", error);
    }
  };

  return (
    <div className="container">
        <button className="button" onClick={addShopping}>Thêm vào giỏ hàng</button>

      <h2>Giỏ hàng</h2>
      {cartItems.length > 0 ? (
        <table  className="table table-bordered">
          <thead>
            <tr>
              <th>Tên sản phẩm</th>
              <th>Ảnh sản phẩm</th>
              <th>Giá</th>
              <th>Xóa</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>
                  <img style={{ width:'100px',height:'100px' }} src={item.avatar} alt={item.name} />
               </td>
                  <td>{item.quantity}</td>
                <td>
                  <button className='btn btn-warning' onClick={() => removeItemFromCart(item)}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Giỏ hàng trống</p>
      )}
    </div>
  );
};

export default Shopping;
