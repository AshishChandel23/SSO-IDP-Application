Server side Integeration ::--

* Provide through the IDP-House Side
```
IDP_AUTH_SERVER_URL=https://example-idp.com
IDP_CLIENT_ID=your-client-id
IDP_CLIENT_SECRET=your-client-secret
IDP_REDIRECT_URI=http://localhost:4001/api/v1/callback
JWT_SECRET_KEY=your-jwt-secret-key
```

```
import passport from 'passport';
import { Strategy as CustomStrategy } from 'passport-custom';

const loginStrategy = new CustomStrategy(async (req, done) => {
    try {
        const authUrl = `${process.env.IDP_AUTH_SERVER_URL}/authorize?response_type=code&client_id=${process.env.IDP_CLIENT_ID}&redirect_uri=${process.env.IDP_REDIRECT_URI}&scope=openid profile email&state=xyz`;
        done(null, { redirectUrl: authUrl });
    } catch (error) {
        done(error);
    }
});

passport.use('login', loginStrategy);

app.get('login', passport.authenticate('login'), (req, res) => {
    res.status(200).json({ error: false, redirectUrl: req.user.redirectUrl });
});

```

```
import passport from 'passport';
import { Strategy as CustomStrategy } from 'passport-custom';

const callbackStrategy = new CustomStrategy(async (req, done) => {
    const { code, state } = req.query;
    try {
        const tokenResponse = await axios.post(`${process.env.IDP_AUTH_SERVER_URL}/token`, {
            grant_type: 'authorization_code',
            code,
            redirect_uri: process.env.IDP_REDIRECT_URI,
            client_id: process.env.IDP_CLIENT_ID,
            client_secret: process.env.IDP_CLIENT_SECRET,
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        const { access_token } = tokenResponse.data;
        const userInfoResponse = await axios.get(`${process.env.IDP_AUTH_SERVER_URL}/profile`, {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        done(null, userInfoResponse.data);
    } catch (error) {
        done(error);
    }
});

passport.use('callback', callbackStrategy);

app.get('/callback', passport.authenticate('callback', {
    //optional use success route or below callback 
    successRedirect:'/success route'
    failureRedirect: '/failure route',
}), (req, res) => {
    //you will get the user here
    //use case according to your requierment
    //like redirection done through this such as dashboard route 
    // example generate token and send
    const token = JWT.sign(req.user, process.env.JWT_SECRET_KEY, { expiresIn: '2h' });
    res.redirect(`/dashboard?token=${token}`);
});

```

```
import passport from 'passport';
import { Strategy as CustomStrategy } from 'passport-custom';

const logoutStrategy = new CustomStrategy(async (req, done) => {
    try {
        const { data } = await axios.get(`${process.env.IDP_AUTH_SERVER_URL}/logout`);
        done(null, { data });
    } catch (error) {
        done(error);
    }
});

passport.use('logout', logoutStrategy);

app.get('/logout', passport.authenticate('logout'), (req, res) => {
    const message = req.user.message; // Store the message before logging out
    req.logout((err) => {
        if (err) {
            console.log("logout error:: >>", err);
            return res.status(500).json({ error: true, message: 'Logout failed' });
        }
        res.status(200).json({ error: false, message });
    });
});

```

Frontend Integration ::-

*Login Method like this ::-

```
const handleLogin = async () => {
    try {
        const response = await fetch(`{YOUR_SERVER_URL}/login`);
        const data = await response.json();
        if (data.redirectUrl) {
            window.location.href = data.redirectUrl;
        }
    } catch (error) {
        console.error('Login failed:', error);
    }
};
```

*Logout Method like this ::-
```
const handleLogout = async () => {
    try {
        const response = await fetch(`{YOUR_SERVER_URL}/logout`);
        const data = await response.json();
        if (!data.error) {
            alert(data.message);
            // Redirect to home page or perform other logout actions
        }
    } catch (error) {
        console.error('Logout failed:', error);
    }
};
```


