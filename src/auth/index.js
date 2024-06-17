import express from "express";
import { register, login, adminLogin } from "./authController";
import passport from "passport";
import ClientApplication from "../client_app/model";
import crypto from "crypto";
import { AuthorizationCode, TokenCode } from "./model";
import User from "../user/model";
import { error } from "console";

const router = express();

//UI route for redirection into register
router.get("/register", (req, res, next) => {
  return res.status(200).redirect("/register");
});

router.post("/register", register);

//UI route for redirection into login
router.get("/login", (req, res, next) => res.redirect("/login"));

//custom login function
// router.post('/login', login);
//using passport authentication login
router.post("/login", (req, res, next) => {
  // console.log("req session", req.session.oauth2return);
  passport.authenticate("local", (err, user, info) => {
    // console.log("Passport authenticate ::>>", err, user, info);
    // console.log("in authenticatoin process");
    if (err) return next(err);
    if (!user)
      return res.status(400).json({
        error: "Login failed",
        message: info.message,
      });
    const redirectUrl = req.session.oauth2return || "/";
    req.logIn(user, (err) => {
      if (err) return next(err);
      // Redirect to the stored original URL after successful login
      // console.log("req.session.oauth2return", req.session.oauth2return, redirectUrl);
      delete req.session.oauth2return;
      return res.status(200).json({
        error: false,
        message: "You are In-Login way",
        redirectUrl,
      });
    });
  })(req, res, next); // Pass `next` here
});

// Authorization route and First hit url from client application
router.get("/authorize", async (req, res, next) => {
  // check user is authenticated (already login)
  if (!req.isAuthenticated()) {
    // console.log("---Not authenticated---");
    req.session.oauth2return = req.originalUrl;
    // Temporary store data of redirection url in session
    // console.log("Temporary store session for data::>>", req.session.oauth2return);
    // got into login
    return res.redirect("/login");
  }
  //if user is authenticated
  //   console.log("----In authorize----");
  //find client appicatioint
  const client = await ClientApplication.findOne({
    clientId: req.query.client_id,
  });
  if (!client) {
    return res.status(400).send("Invalid client");
  }
  // Confirmation of user for redirection and shared its info to client application
  res.send(`<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body{
          font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
          padding: 2rem;
          background-color:#add8e6;
      }
      .formBody{
          background: url('${process.env.BASE_URL}/media/registerBackground-SDY5XHNI.jpg');
          background-size: cover;
          background-repeat: repeat-x;
          background-attachment: initial;
          margin: auto;
          width: 100%;
          height: 100%;
          box-shadow: 3px 4px 15px 4px whitesmoke;
      }
      .form{
        margin: auto;
        border-radius: 5px;
        padding: 25px;
        display: flex;
        flex-direction: column;
        gap: 4px;
        justify-content: center;
        align-items: center;
      }
      .btnDiv{
         align-self:center;
         padding: 5px;
      }
      .authorizeBtn{
          border: none;
          border: 1px groove;
          border-color: white;
          border-radius: 5px;
          padding: 8px;
          background-color:palevioletred;
          color: azure;
          font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
          font-size: medium;
          width: 150px;
      }
      .authorizeBtn:hover{
         border: 1px solid;
         border-color: teal;
         background-color:mediumseagreen;
         cursor:pointer;
      }
      .astrick{
          color: palevioletred;
          font-weight: bolder;
          font-size: larger;
          margin: 0px 5px;
      }
    </style>
  </head>
  <body>
    <div class="formBody">
      <form method="post" class="form" action="/api/v1/auth/authorize">
          <div>
              <p><span class="astrick">*</span>Do you grant <span class="astrick"> ${client.applicationName}</span> permission to access your profile? </p>
              <input type="hidden" name="response_type" value="${req.query.response_type}" />
              <input type="hidden" name="client_id" value="${req.query.client_id}" />
              <input type="hidden" name="redirect_uri" value="${req.query.redirect_uri}" />
              <input type="hidden" name="state" value="${req.query.state}" />
          </div>
          <div class="btnDiv">
              <button type="submit" class="authorizeBtn">Authorize</button>
          </div>
      </form>
    </div>
  </body>
  </html>
      `);
});

router.post("/authorize", async (req, res, next) => {
  // console.log("-----authorize-----");
  const authorizationCode = crypto.randomBytes(16).toString("hex");
  const redirectUri = new URL(req.body.redirect_uri);
  const newAuthorizationCode = await AuthorizationCode.create({
    authCode: authorizationCode,
    info: { clientId: req.body.client_id, userId: req.user.id },
  });
  redirectUri.searchParams.set("code", authorizationCode);
  redirectUri.searchParams.set("state", req.body.state);
  res.redirect(redirectUri.toString());
});

router.post("/token", async(req, res, next) => {
  // console.log("Req body of token request ::>>", req.body);
  const { code, client_id, client_secret, redirect_uri } = req.body;
  const authCodeInfo = await AuthorizationCode.findOne({authCode:code});
  // console.log("authCodeinfo ::>>", authCodeInfo);
  if (!authCodeInfo || authCodeInfo.info.clientId !== client_id) {
    return res.status(400).send("Invalid authorization code");
  }
  const client = await ClientApplication.findOne({  
    clientId:client_id,
    clientSecret:client_secret
  });
  if (!client) {
    return res.status(400).send("Invalid client credentials");
  }
  await AuthorizationCode.findByIdAndDelete(authCodeInfo._id);
  const user = await User.findById(authCodeInfo.info.userId);
  const accessToken = crypto.randomBytes(32).toString("hex");
  await TokenCode.create({userId:authCodeInfo.userId, user, accessToken, expireIn:new Date()});
  return res.status(200).json({
    access_token: accessToken,
    token_type: "Bearer",
    expires_in: 3600,
  });
});

// Protected resource route
router.get('/profile', passport.authenticate("bearer", { session: false }), (req, res, next) => {
    // console.log("user ::>>", req.user);
    const { password, ...rest } = req.user.user;
    return res.status(200).json({ ...rest });
  }
);

//logout
router.get('/logout',(req, res, next)=>{
  console.log("logout--->");
  req.logout((err) => {
    if (err) {
        console.log("logout error ::>>", err);
        return next(createError(500, "Error in ,logging out"))
    }});
  req.session.regenerate((err) => {
      if (err) {
          return next(createError(500, "Error in ,logging out"))
      } else {
          return res.clearCookie('connect.sid').status(200).json({
            error:false,  
            message:"Logout Successfully"
          });
      }
  });
});

router.post("/adminLogin", adminLogin);

export default router;
