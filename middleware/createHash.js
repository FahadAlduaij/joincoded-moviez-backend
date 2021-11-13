const bcrypt = require("bcrypt");

exports.createHash = async (userPasword) => {
	const saltRounds = 10;
	const hashedPassword = await bcrypt.hash(userPasword, saltRounds);
	return hashedPassword;
};
