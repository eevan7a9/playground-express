import jwt from "jsonwebtoken";

export const isAuthenticated = async function (req, res, next) {
  console.log("Process: Will authenticate...");
  if (!req.headers.authorization) {
    res.status(401).send({ message: "Authorization is undefined" });
    return;
  }
  const token = req.headers.authorization.split(" ")[1];
  try {
    console.log("Result: Authentication is a success.");
    const { id } = jwt.verify(token, process.env.SECRET_KEY);
    res.locals.tokenId = id;
    next();
  } catch (err) {
    console.log("Result: Authentication is a failure.");
    res.status(401).send(err);
    return;
  }
};
