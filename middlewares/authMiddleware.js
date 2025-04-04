import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.userId = decoded.userId;

      next();
    } catch (error) {
      res.status(401).json({ message: "Неверный или просроченный токен" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Нет токена, авторизация не выполнена" });
  }
};
