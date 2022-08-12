const jwt = require ('jsonwebtoken');


// CREAR TOKEN. Devuelve token
// Pasar primer elemento como un objeto.
const getToken = (userId) => { 
	return jwt.sign({ userId: userId }, process.env.SECRET_TOKEN, {expiresIn: '30d'}) 
};

// VERIFICAR TOKEN. Solo devuelve true o false 
const verifyToken = (token) => {
	const verificationStatus = jwt.verify(token, process.env.SECRET_TOKEN, function(err, decoded) {
		if (err) return false
		return true
	})
	return verificationStatus
};

// OBTENER INFO DEL TOKEN. Te devuelve la info que este dentro del token. De momento solo el userId
const getDataToken = (token) => {
	const decodedInfoToken = jwt.verify(token, process.env.SECRET_TOKEN, function(err, decoded) {
		if (err) {
			return {
				isValid: false,
				error: err
			}
		 } else {
			return {
				isValid: true,
				userId: decoded.userId,
			}
		 }
	})
	return decodedInfoToken;
};


		const authenticate = async (req, res, next) => {
			const token = req.headers.authorization;
			const {userId} = getDataToken(token);
			try {
			{
			  res.locals.userId = userId;
			  console.log("local",  res.locals)
			  return next();
			}
		} catch (error) {
			return res.status(404).send(`Authentication failed: ${error.message}`);
		}
	};


	
module.exports = {
	getToken,
	verifyToken,
	getDataToken,
	authenticate,
}