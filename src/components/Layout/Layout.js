import React, { Component } from "react";
import DashboardHeader from "../DashboardHeader/DashboardHeader";
import BottomNav from "../BottomNav/BottomNav";
import { useState, useEffect } from "react";
import useUser from "../../../lib/useUser";
import fetchJson from "../../../lib/fetchJson";
import { Paper } from "@mui/material";

export default function Layout({ children }) {
  const [signedIn, setSignedIn] = useState(false);

  const { mutateUser } = useUser({
    redirectIfFound: false,
  });

  const checkForUser = async () => {
    const user = mutateUser(fetchJson("/api/user"), false);
    const data = await user;

    if (data.isLoggedIn) {
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
  };

  useEffect(() => {
    checkForUser();
  });

  return (
    <div style={{ backgroundColor: "#fff" }}>
      <DashboardHeader />
      {children}
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNav />
      </Paper>
    </div>
  );
}
