module.exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.send(
      '<h1>You are authenticated</h1><p><a href="/logout">Logout and reload</a></p>'
    );
  } else {
    res.send(
      '<h1>You are not authenticated</h1><p><a href="/login">Login</a></p>'
    );
  }
  next();
};

module.exports.isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.admin) {
    res.send("<h1>Congrats for being an admin</h1>");
  } else {
    res.send("<h1>Uh! You are NOT an admin</h1>");
  }
};
