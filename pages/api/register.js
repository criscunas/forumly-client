import withSession from '../../lib/session';
import axios from 'axios';
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";

// export default withSession(async (req, res) => {
//   const { username, email, hashed_password } = await req.body;

//   try {
//     const user = await axios.post('http://localhost:3999/user/signup', {
//       username: username,
//       email: email,
//       hashed_password: hashed_password
//     });

//     const newUser = { id: user.user_id, username: user.username, isLoggedIn:true };
//     req.session.user = newUser;
//     await req.session.save();
//     res.json(newUser)
//   }  
//   catch(error) {
//     console.log(error, error.message)
//   }
// });


export default withIronSessionApiRoute(
  async function registerRoute(req, res) {
  
  const {username, email, hashed_password} = req.body;  

  const data = await axios.post("http://localhost:7777/user/signup", {
    username: username,
    hashed_password: hashed_password,
    email: email
  })

  const resp = await data.data;

  const user = { isLoggedIn: true, username: username, auth: resp.auth };
    
   req.session.user = user;
   await req.session.save();
   res.json(user);

  },
sessionOptions);