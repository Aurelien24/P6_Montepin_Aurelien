const jwt = require('jsonwebtoken');

// 3 cas
// 1 -> il n'y as pas de req.body
// 2 -> il y as req.body
// 3 -> il y as une image

module.exports = (req, res, next) => {

  console.log(req.body.userId)

  try {

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'Mon_TOKEN_developpement');
    const userId = decodedToken.userId;

    if(req.body.userId == undefined){

      console.log("c'est bien undefined")
      console.log(req.body)

      //possibilité pour req.body avec json.parse
      if(req.body.sauce == undefined){ // Il n'y as normalement ni image ni req.body

        // Le token apparait comme valable ligne 15
        console.log("Aucun userId, aucune image...")
        next();

      }else{ // Il y as une image

        const sauceData = JSON.parse(req.body.sauce);

        if(sauceData.userId == userId){
          
          console.log("il y as une image et les deux userId corresponde")
          next();
        } else {
          console.log("Il y as une image mais les deux userId ne corresponde pas")
          res.status(401).json({
            error: error
        });
        }
      }

    }else{ // Il n'y as pas d'image mais il y as un req.body
        
      console.log(userId)
      console.log("req.body.userId = " + req.body.userId)
  
      if (req.body.userId == userId) {
          console.log("requète autorisé")
          next();
      } else {
  
          console.log("req.body.userId !== userId")
          res.status(401).json({
              error: error
          });
      }
    } 
  }catch (error){
  
    console.log("try echec")
    res.status(401).json({
        error: error
    });
  }

  /*

  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'Mon_TOKEN_developpement');
    const userId = decodedToken.userId;
    console.log(userId)
    console.log("req.body.userId = " + req.body.userId)

    /*if (req.body.userId == undefined) {

    }else 
    
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch (error){
    res.status(401).json({
      error: error
    });
  }

/*try {
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'Mon_TOKEN_developpement');
  const userId = decodedToken.userId;

  if (token) {
    jwt.verify(token, 'Mon_TOKEN_developpement' req, res) => {
      console.log("valable")
    }
  }

  if (req.body.userId && req.body.userId !== userId) {
    throw 'Invalid user ID';
  } else {
    next();
  }
} catch (error){
  res.status(401).json({
    error: error
  });
} */

};