import React from 'react'
import './Footerstyle.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className="footer" id='footer'>
        <div className="footer-contant">
            <div className="footer-contant-left">
                <img src={assets.logo} alt="" />
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium cumque ut animi labore dolor ab architecto? Dignissimos magni repellendus nam reiciendis ullam sed, iure impedit, officia perferendis, repudiandae amet asperiores. 
                </p>
                <div className="footer-social-icon">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer-contant-centre">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="footer-contant-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>03032897897</li>
                    <li>contact565@gmail.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className="footer-copyright">
            Copyright 2025 @ Tomato.com - All Right Reserved
        </p>
    </div>
  )
}

export default Footer;