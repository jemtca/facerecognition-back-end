
const handleRegister = (req, res, db, bcrypt) => {
	const { name, email, password } = req.body;
	const hash = bcrypt.hashSync(password);

	if (!name || !email || !password) {
		res.status(400).json('incorrect form submission');
	}
	else {
		db.transaction(trx => {
			trx.insert({
				hash: hash,
				email: email,
			})
			.into('login')
			.returning('email')
			.then(loginEmail => {
					return trx.insert({ // return must be used to make commit statement works
						name: name,
						// email: loginEmail[0],
						email: loginEmail[0].email,
						joined: new Date(), 
					})
					.into('users')
					.returning('*')
					.then(user => {
						res.json(user[0]);
					})
				})
			.then(trx.commit) // in order to add everything
			.catch(trx.rollback) // if anything fails, roll back the changes
		})
		.catch(error => {
			res.status(400).json('unable to register');
		});
	}
}

module.exports = {
	handleRegister
};
