import React from 'react'
import '../styles/cart.css'
import Helmet from '../components/Helmet/Helmet'
import { Container, Col, Row } from 'reactstrap'
import { motion } from 'framer-motion'
import { cartActions } from '../redux/slices/cartSlice'
import { useSelector, useDispatch } from 'react-redux'
import { toast} from "react-toastify"
import { Link } from 'react-router-dom'
const Cart = () => {
  const cartItems = useSelector(state => state.cart.cartItems);
  const totalAmount = useSelector(state => state.cart.totalAmount)
  return <Helmet title='Cart'>
    <Container>
      <Row>
        <Col lg='9'>
          {cartItems.length === 0 ? (<h2 className="fs-4 text-center">Khong cos sanr pharm</h2>)
            : (<table className="table bordered">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {
                  cartItems.map((item, index) => (
                    <Tr item={item} key={index}/>
                  ))
                }
              </tbody>
            </table>)
          }
        </Col>
        <Col lg='3'>
          <div className="d-flex align-items-center justify-content-between">Subtotal: <span className="fs-4 fw-bold">${totalAmount}</span></div>
          
          <p className="fs-6 mt-2">
            taxes and shipping will calculate in checkout
          </p>
          <div>
            <motion.button  className="buy__btn w-100"><Link to='/shop'>Continue Shopping</Link></motion.button>
            <motion.button  className="buy__btn mt-2 mb-3 w-100"><Link to='/checkout'>Checkout</Link></motion.button>
          </div>
        </Col>
      </Row>
    </Container>
  </Helmet>
}
const Tr = ({ item }) => {
  const dispatch = useDispatch()
  const deleteProduct = () =>{
    dispatch(cartActions.deleteItem(item.id))
    toast.error('Xóa sản phẩm thành công!', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  }
  return <tr>
    <th><img src={item.imgUrl} alt="" /></th>
    <th>{item.productName}</th>
    <th>${item.price}</th>
    <th>{item.quantity}</th>
    <th><motion.i whileTap={{ scal2: 1.2 }} onClick={deleteProduct} class="ri-delete-bin-5-line"></motion.i></th>
  </tr>
}
export default Cart
