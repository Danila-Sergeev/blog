import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).send("Authorization needed");
  }

  let payload;

  try {
    payload = jwt.verify(
      authorization.replace("Bearer ", ""),
      "super-strong-secret"
    );
  } catch (err) {
    return res.status(401).send("Invalid token");
  }

  req.user = payload;
  return next();
};
