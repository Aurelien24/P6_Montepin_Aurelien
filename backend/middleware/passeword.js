module.exports = (req, res, next) =>  { 

    try {

        const str = req.body.password;

        // 1 chiffre, 1 majuscule, 1 minuscule et 12 character
        if (str.match(/[0-9]/g) && 
            str.match(/[A-Z]/g) && 
            str.match(/[a-z]/g) && 
            //str.match(/[^a-zA-Z\d]/g) &&
            str.length >= 12) {
                console.log("Mdp bon")
                next();

        } else {
            console.log("Mdp erreur")
            res.status(401).json({
              message: "Votre mot de passe doit avoir au moin un chiffre, une majuscule, une minuscule et 12 character"
            });
        }

      } catch (error){
        console.log("Mdp try echec")
        res.status(401).json({
          message: "Erreur interne, veuillez réessayer dans quelque instant"
        });
      }
}