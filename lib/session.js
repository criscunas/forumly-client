
import {withIronSessionSsr } from "iron-session/next";

export const sessionOptions = {
  password: 'adsadkajdajfkadasd',
  cookieName: 'cookieName',
  cookieOptions: {
    secure: false,
  },
};

export function withSessionSsr(handler) {
  return withIronSessionSsr(handler, sessionOptions);
}

