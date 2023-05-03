// authenticator middleware for protecting routes if no valid user login exists
async function authenticator(req, res, next) {
  // if no user id is found in the session sent by the request, send an error response 401 unauthorised to the client, otherwise continue
  if (!req.session.userid) {
    res.status(401).send(false);
  } else {
    next();
  }
}

module.exports = authenticator;
