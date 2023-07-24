import React from "react";
import axios from "axios";
import '../style/admin.css';

const API = "https://63a5721a318b23efa793a770.mockapi.io/api/produce/"

class Admin extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          product: [],
          id: null,
          name: "",
          avatar: "",
          quatity: "",
          description:""
        };
    }
    setStatus = () => {
        this.setState({ showAddForm: !this.state.showAddForm });
    }
    componentDidMount() {
        axios
            .get(API)
            .then(response => {
                this.setState({ product: response.data });
            })
            .catch(error => {
                console.log(error);
            });
    }
    deleteBook = (id) => {
      if (window.confirm("Bạn có chắc chắn muốn xóa?")) {
          axios
              .delete(API + id)
              .then(response => {
                  console.log(response);
                  const updatedProduct = this.state.product.filter(item => item.id !== id); 
                  this.setState({ product: updatedProduct });
                  alert("Xóa thành công!");
              })
              .catch(error => {
                  console.log(error);
              });
      }
  }
  
  
  addBook = async () => {
    try {
      const Productlist = {
        name: this.state.name,
        avatar: this.state.avatar,
        quatity: this.state.quatity,
        description: this.state.description
      };
  
      const response = await axios.post(API, Productlist);
  
      console.log(response);
  
      const updatedProduct = [...this.state.product, response.data];
  
      this.setState(
        {
          product: updatedProduct,
          name: '',
          avatar: '',
          quatity: '',
          description: ''
        },
        () => {
          this.setState({ showForm: false }); // Ẩn form sau khi đã cập nhật state thành công
        }
      );
  
      alert("Thêm mới thành công!");
    } catch (error) {
      console.log(error);
    }
  };
      formAddBook = () => {
        return (
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-body">
                    <div className="form-group">
                      <label>Tên Sản phẩm</label>
                      <input type="text" className="form-control" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label>Ảnh sản phẩm</label>
                      <input type="text" className="form-control" value={this.state.avatar} onChange={(e) => this.setState({ avatar: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label>Gía</label>
                      <input type="text" className="form-control" value={this.state.quatity} onChange={(e) => this.setState({ quatity: e.target.value })} /> {/* Sửa thành 'quantity' */}
                    </div>
                    <div className="form-group">
                      <label>Mô tả</label>
                      <input type="text" className="form-control" value={this.state.description} onChange={(e) => this.setState({ description: e.target.value })} /> {/* Sửa thành 'quantity' */}
                    </div>
                    <button type="button" className="btn btn-primary" onClick={this.addBook}>Add</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    formEditBook = () => {
        if (!this.state.showEditForm) {
          return null; // Không hiển thị form khi showEditForm = false
        }
      
        return (
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-body">
                    <div className="form-group">
                      <label>ID</label>
                      <input type="text" className="form-control" value={this.state.id} onChange={(e) => this.setState({ id: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label>Tên sản phẩm</label>
                      <input type="text" className="form-control" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label>Ảnh sản phẩm</label>
                      <input type="text" className="form-control" value={this.state.avatar} onChange={(e) => this.setState({ avatar: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label>Gía </label>
                      <input type="text" className="form-control" value={this.state.quatity} onChange={(e) => this.setState({ quatity: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label>Mô tả sản phẩm</label>
                      <input type="text" className="form-control" value={this.state.description} onChange={(e) => this.setState({ description: e.target.value })} />
                    </div>
                    <button type="button" className="btn btn-primary" onClick={this.updateBook}>Sửa</button>
                    <button type="button" className="btn btn-primary" onClick={() => this.setState({ showEditForm: false })}>Hủy</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
      
      editBook = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn chỉnh sửa?")) {
          const product = this.state.product.find(item => item.id === id);
          if (product) {
            this.setState({
              id: product.id,
              name: product.name,
              avatar: product.avatar,
              quatity: product.quatity,
              description: product.description,
              showEditForm: true
            });
          }
        }
      };
      
      updateBook = () => {
        if (window.confirm("Bạn có chắc chắn muốn lưu thay đổi?")) {
          // Thực hiện các thao tác cập nhật sách
          const updatedProduct = {
            id: this.state.id,
            name: this.state.name,
            avatar: this.state.avatar,
            quatity: this.state.quatity,
            description: this.state.description
          };
      
          // Thực hiện gửi yêu cầu cập nhật sách
          axios
            .put(API + this.state.id, updatedProduct)
            .then(response => {
              console.log(response);
              // Cập nhật state và hiển thị thông báo
              const updatedProductList = this.state.product.map(item => {
                if (item.id === this.state.id) {
                  return { ...item, ...updatedProduct };
                }
                return item;
              });
              this.setState({
                product: updatedProductList,
                showEditForm: false
              });
              alert("Sửa thành công!");
            })
            .catch(error => {
              console.log(error);
            });
        }
      };
      
    render() {
        return (
            <div>

                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-body">
                                    <h4 class="Title_table">Quản lý sản phẩm</h4>
                                    <p className="card-text">
                                    <button className="btn btn-primary" onClick={this.setStatus}>Thêm sản phẩm mới</button>
                                        {/* <button class="AddBtn" onClick={this.setStatus}>Add Book</button> */}
                                    </p>
                                    {this.state.showAddForm ? this.formAddBook() : null}

                                    <table className="table table-bordered">
                                        <thead>

                                            <tr>
                                                <th>ID</th>
                                                <th>Tên sản phẩm</th>
                                                <th>Ảnh sản phẩm</th>
                                                <th>Gía</th>
                                                <th>Mô tả sản phẩm</th>
                                                <th>Xóa</th>
                                                <th>Sửa</th>

                                            </tr>
                                        </thead>

                                        <tbody>
                                            {this.state.product.map((products) =>(
                                                <tr >
                                                    <td><textbox type="text" name="id" onChange={this.handleChange} /> {products.id}</td>
                                                    <td>{products.name}</td>
                                                    <td><img className="img2" src={products.avatar} alt={products.name} /></td>
                                                    <td>{products.quatity}</td>
                                                    <td>{products.description}</td>
                                                    <td><button className="btn btn-primary" onClick={() => this.deleteBook(products.id)}>Delete</button></td>
                                                    <td><button className="btn btn-primary" onClick={() => this.editBook(products.id)}>Edit</button></td>
                                                </tr>
                                            ))}
                                            </tbody>
                                    </table>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.showEditForm ? this.formEditBook() : null}
             </div>
        );
     }
 }
export default Admin;
