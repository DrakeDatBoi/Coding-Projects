import React from "react";
import "./FooterStyle.css";

export const Footer = () => {
    return (
        <>
        <div className="footer" style={{backgroundColor:"black", height:"8.5VH", margin:0, overflowY:"hidden", textAlign:"center", }}>
        <a style={{color:"white", margin:0}} href="https://maps.google.com/maps?daddr=42.0249565,-93.6515007&amp;ll=">Directions</a>
        </div>
        </>
    );
};

export default Footer;
