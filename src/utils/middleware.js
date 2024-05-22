const logger = require("./logger");
const session = require("express-session");
const jwt = require("jsonwebtoken");
// const User = require("../model/user.model");

const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

// middleware to test if authenticated
const isAuthenticated = async (req, res, next) => {
  // try {
  //   // get token in headers
  //   const token =
  //     req.headers.authorization && req.headers.authorization.split(" ")[1];
  //   if (!token) {
  //     return res.status(401).json({
  //       status: 401,
  //       error: "Vous n'êtes pas autorisé à accéder à cette ressource, veillez vous connecter",
  //     });
  //   }

  //   // Vérifier le token de manière asynchrone
  //   jwt.verify(
  //     token,
  //     process.env.SECRET_KEY || "afristore_key",
  //     (err, decoded) => {
  //       if (err) {
  //         return res.status(401).json({
  //           status: 401,
  //           error: "Vous n'êtes pas autorisé à accéder à cette ressource, veillez vous connecter",
  //         });
  //       }
  //       next();
  //     }
  //   );
  // } catch (error) {
  //   next(error);
  // }
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else {
    return response
      .status(400)
      .json({ error: error.message, name: error.name });
  }
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  isAuthenticated,
};
