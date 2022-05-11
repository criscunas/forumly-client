import React, { Component } from "react";
import Header from "../Header/Header";
import BottomNav from "../BottomNav/BottomNav";
import layoutStyles from './Layout.module.scss';


export default function Layout({ children }) {
  
  return (
    <div style={{ backgroundColor: "#fff" }} className ={layoutStyles.layout}>
      <Header />
      <div style = {{paddingBottom:"6rem"}} className = {layoutStyles.layout__content}>
      {children}
      </div>
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0 }} >
        <BottomNav />
      </div>
    </div>
  );
}
