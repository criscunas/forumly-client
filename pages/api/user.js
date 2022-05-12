import { sessionOptions } from '../../lib/session';
import { withIronSessionApiRoute } from "iron-session/next";


export default withIronSessionApiRoute(userRoute, sessionOptions);

async function userRoute(req, res) {

  if (req.session.user) {
    res.json({
      isLoggedIn: true,
      auth:req.session.user.auth,
      username:req.session.user.username
    })
  } else {
    res.json({
      isLoggedIn: false,
    })
  }
}