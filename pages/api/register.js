import axios from 'axios';
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";



export default withIronSessionApiRoute(

  async function registerRoute(req, res) {
  
  const {username, email, hashed_password} = req.body;  

  const url = process.env.URL;

  console.log(url)

  const data = await axios.post(`${url}/user/signup`, {
    username: username,
    hashed_password: hashed_password,
    email: email,
  });

  const resp = await data.data;

  const user = { isLoggedIn: true, username: username, auth: resp.auth };
    
   req.session.user = user;
   await req.session.save();
   res.json(user);

  },
sessionOptions);

