module.exports = (req, res, next) =>  { 

    try {

        const str = req.body.password;

    
        if (str.match( /[0-9]/g) && 
            str.match( /[A-Z]/g) && 
            str.match(/[a-z]/g) && 
            str.match( /[^a-zA-Z\d]/g) &&
            str.length >= 12) {
                console.log("Mdp bon")
                next();

        } else {
            console.log("Mdp erreur")
            res.status(401).json({
                error: error
              });
        }

      } catch (error){
        console.log("Mdp try echec")
        res.status(401).json({
          error: error
        });
      }
}