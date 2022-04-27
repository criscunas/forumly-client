import React, {Component} from 'react';
import DashboardHeader from './DashboardHeader/DashboardHeader';
import { sessionOptions } from "../../lib/session";
import { withIronSessionSsr } from "iron-session/next";
import { useState, useEffect } from 'react';
import useUser from '../../lib/useUser';
import fetchJson from '../../lib/fetchJson';

export default function Layout ({children}) {

  const [signedIn, setSignedIn] = useState(false);

  const { mutateUser } = useUser({
    redirectIfFound: false,
  });

  const checkForUser = async () => {
    const user = mutateUser(fetchJson("/api/user"), false);
    const data = await user;

    if (data.isLoggedIn) {
      console.log("user found");
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
  };

  useEffect(() => {
    checkForUser();
  }, [signedIn]);

  return (
    <div>
      <DashboardHeader/>
        {children}
    </div>
  )
}


