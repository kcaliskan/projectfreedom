import React, { Fragment } from "react";

const Footer = ({ children }) => {
  const footerStyle = {
    backgroundColor: "#eeeff3",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    padding: "20px",
    // position: "fixed",
    left: "0",
    bottom: "0",
    height: "60px",
    width: "100%",
    boxShadow:
      "0 5px 5px 0 rgba(154, 160, 185, 0.05),0 5px 30px 0 rgba(166, 173, 201, 0.22)"
  };

  const phantomStyle = {
    display: "block",
    padding: "20px",
    height: "60px",
    width: "100%"
  };

  const footerTextStyle = {
    fontSize: "15px",
    color: "#323941"
  };

  return (
    <div>
      <div style={phantomStyle} />
      <div style={footerStyle}>
        <div style={footerTextStyle}>
          Designed and Developed by{" "}
          <a href="https://kaan.dev" target="_blank">
            Kaan Caliskan
          </a>
          . 2019 © AlgoTrack
        </div>
      </div>
    </div>
  );
};

export default Footer;
