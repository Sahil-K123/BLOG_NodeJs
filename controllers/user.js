export default async (req, res) => {
    const { fullName, email, password } = req.body;
    await User.create({
      fullName,
      email,
      password,
    });
    return res.redirect("/");
  }