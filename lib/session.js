
import {withIronSessionSsr } from "iron-session/next";

export const sessionOptions = {
  password: "5LSHz47eVdaZNgk75Kz2Xu2GyJ4ASjLM",
  cookieName: 'digi',
  cookieOptions: {
    secure: true,
  },
};

export function withSessionSsr(handler) {
  return withIronSessionSsr(handler, sessionOptions);
}

