import axios from "axios";
import { sessionOptions } from "../../lib/session";
import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(async function loginRoute(req, res) {

    const { username, hashed_password } = req.body;

    const data = await axios.post("/user/login", {
        username: username,
        hashed_password: hashed_password,
    });

    const resp = await data.data;

    const user = { isLoggedIn: true, username: username, auth: resp.auth };

    req.session.user = user;
    await req.session.save();
    res.json(user);

}, sessionOptions);
