const jwt = require("jsonwebtoken");
const config = require("config");

// Verify Token validity and attach token data as request attribute
exports.verifyToken = (req, res, next) => {
  // Get token from header
  const token = req.header("x-auth-token");

  //Check if not token
  if (!token) {
    return res.status(401).json({ mg: "No token, authorization denied" });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.user = decoded.user;

    next();
  } catch (err) {
    //If there is a token but it's not valid
    res.status(401).json({ msg: "Token is not valid" });
  }
};

// Issue Token
exports.signToken = async (req, res) => {
  try {
    //Creating payload with user id for JWT
    const payload = {
      user: {
        userId: req.user._id
      }
    };
    //Sign in with JWT
    const token = jwt.sign(payload, config.get("jwtSecret"), {
      expiresIn: 3600000
    });

    return token;
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.forwardAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
};
