import '../style/header.css';
import { Routes, Route, Link } from "react-router-dom";
import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <div className='header'>
        <img  src='https://laz-img-cdn.alicdn.com/images/ims-web/TB1T7K2d8Cw3KVjSZFuXXcAOpXa.png'></img>
        <div className='menu'>
          <ul>
            <li>
              <Link to="/">TRANG CHỦ</Link>
            </li>
            <li>
              <Link to="/Admin">ADMIN</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Header;
