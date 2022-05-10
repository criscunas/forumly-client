import React, { Component } from "react";
import DashboardHeader from "../DashboardHeader/DashboardHeader";
import BottomNav from "../BottomNav/BottomNav";
import { useState, useEffect } from "react";
import useUser from "../../../lib/useUser";
import fetchJson from "../../../lib/fetchJson";
import { Paper } from "@mui/material";
import CreateThread from '../CreateThread/CreateThread';
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../../../lib/session";
import layoutStyles from './Layout.module.scss';




export default function Layout({ children }) {
  
  return (
    <div style={{ backgroundColor: "#fff" }} className ={layoutStyles.layout}>
      <DashboardHeader />
      <div style = {{paddingBottom:"4rem"}} className = {layoutStyles.layout__content}>
      {children}
      </div>
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNav />
      </Paper>
    </div>
  );
}
