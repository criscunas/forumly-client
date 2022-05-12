
import {withIronSessionSsr } from "iron-session/next";

export const sessionOptions = {
  password: "5LSHz47eVdaZNgk75Kz2Xu2GyJ4ASjLM",
  cookieName: 'forumly',
  cookieOptions: {
    secure: true,
    sameSite:"lax"
  },
};

export function withSessionSsr(handler) {
  return withIronSessionSsr(handler, sessionOptions);
}

