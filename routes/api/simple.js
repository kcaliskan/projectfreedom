//POST new user route (optional, everyone has access)
router.post("/register", (req, res, next) => {
  const {
    body: { user }
  } = req;

  const { fullName, userName, email, password, passwordConfirm } = req.body;

  if (!email) {
    return res.status(422).json({
      errors: {
        email: "is required"
      }
    });
  }

  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: "is required"
      }
    });
  }

  if (!fullName || !userName || !email || !password || !passwordConfirm) {
    return res.status(422).json({
      errors: {
        password: "is required"
      }
    });
  }

  if (password != passwordConfirm) {
    errors.push({ msg: "Passwords do not match" });
  }

  if (password.length < 6) {
    errors.push({ msg: "Password must be at least 6 characters" });
  }

  // const finalUser = new Users(user);

  // finalUser.setPassword(user.password);

  // return finalUser
  //   .save()
  //   .then(() => res.json({ user: finalUser.toAuthJSON() }));
});
