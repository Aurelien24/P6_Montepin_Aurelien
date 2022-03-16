const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'Mon_TOKEN_developpement');
    const userId = decodedToken.userId;
    console.log(userId)
    console.log("req.body.userId = " + req.body.userId)

    if (req.body.userId == undefined) {
        console.log("req.body.userId == undefined")
        res.status(401).json({
            error: error
        });
        
    } else if (req.body.userId == userId) {
        console.log("requète autorisé")
        next();
    } else {

        console.log("req.body.userId !== userId")
        res.status(401).json({
            error: error
        });
    }

  } catch (error){

    console.log("try echec")
    res.status(401).json({
        error: error
    });
  }
};