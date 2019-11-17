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

    req.user = decoded.userId;
    next();
  } catch (err) {
    //If there is a token but it's not valid
    res.status(401).json({ msg: "Token is not valid" });
  }
};

// Issue Token
exports.signToken = (req, res, next) => {
  jwt.sign(
    { userId: req.user._id },
    config.get("jwtSecret"),
    { expiresIn: 36000000 },
    (err, token) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.json({ token });
        next();
      }
    }
  );
};
