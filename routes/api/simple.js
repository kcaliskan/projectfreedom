router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(422).json({
      errors: [
        {
          reason: "email",
          message: "Email is required"
        }
      ]
    });
  }

  if (!password) {
    return res.status(422).json({
      errors: [
        {
          reason: "password",
          message: "Password is required"
        }
      ]
    });
  }

  return passport.authenticate(
    "local",
    { session: false },
    (err, passportUser, info) => {
      if (err) {
        return next(err);
      }

      if (passportUser) {
        console.log("im here");
      }

      return status(400).info;
    }
  )(req, res, next);
});
