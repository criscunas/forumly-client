
import {withIronSessionSsr } from "iron-session/next";

export const sessionOptions = {
  password: process.env.COOKIE_PW,
  cookieName: 'digi',
  cookieOptions: {
    secure: true,
  },
};

export function withSessionSsr(handler) {
  return withIronSessionSsr(handler, sessionOptions);
}

