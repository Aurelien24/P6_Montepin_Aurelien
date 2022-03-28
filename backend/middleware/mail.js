module.exports = (req, res, next) =>  { 

  // La regex n'est utilisé qu'une fois. Elle n'as pas été mise a part
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(req.body.email))
  {
      console.log("email bon")
    next();
  } else {
    console.log("erreur mail")
    res.status(401).json({
      message: "Veuillez entrer une adresse mail valide",
    });
  }
}