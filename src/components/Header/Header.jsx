import React, { useRef, useEffect } from 'react'
import './header.css'
import { motion } from 'framer-motion'
import { Container, Row } from 'reactstrap'
import { NavLink } from 'react-router-dom'
import logo from "../../assets/images/eco-logo.png"
import userIcon from "../../assets/images/user-icon.png"
import { useSelector } from 'react-redux'
const nav__links = [
  {
    path: 'home',
    display: 'Home'
  },
  {
    path: 'shop',
    display: 'Shop'
  },
  {
    path: 'cart',
    display: 'Cart'
  },
]
const Header = () => {
  //show menu down
  const headerRef = useRef(null);
  const totalQuantity = useSelector(state => state.cart.totalQuantity)
  const menuRef = useRef(null)
  const stickyHeaderFunc = () => {
    window.addEventListener('scroll', () => {
      if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        headerRef.current.classList.add('sticky__header')
      } else {
        headerRef.current.classList.remove('sticky__header')
      }
    });
  };
  useEffect(() => {
    stickyHeaderFunc()
    return () => window.removeEventListener('scroll', stickyHeaderFunc)
  });
  const menuToggle = () => menuRef.current.classList.toggle('active__menu')
  //show menu down
  return <header className="header" ref={headerRef}>
    <Container>
      <Row>
        <div className="nav_wrapper">
          <div className="logo">
            <img src={logo} alt="logo" />
            <div>
              <h1>Le Vinh</h1>
            </div>
          </div>
          <div className="navigation" ref={menuRef} onClick={menuToggle}>
            <ul className="menu">
              {nav__links.map((item, index) => (
                <li className="nav_item" key={index}>
                  <NavLink to={item.path} className={(navClass) => navClass.isActive ? 'nav__active' : ''}>{item.display}</NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="nav_icon">
            <span className="fav_icon">
              <i class="ri-heart-line"></i>
              <span className="badge">1</span>
            </span>
            <span className="cart_icon">
              <i class="ri-shopping-bag-line"></i>
              <span className="badge">{totalQuantity}</span>
            </span>
            <span>
              <motion.img whileTap={{ scale: 1.2 }} src={userIcon} alt="" />
            </span>
            <div className="mobile_menu">
              <span onClick={menuToggle}>
                <i class="ri-menu-line"></i>
              </span>
            </div>
          </div>

        </div>
      </Row>
    </Container>
  </header>
};

export default Header
