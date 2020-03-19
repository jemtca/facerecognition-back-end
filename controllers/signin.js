
const handleSignin = (req, res, db, bcrypt) => {
	const { email, password } = req.body;

	if (!email || !password) {
		res.status(400).json('incorrect form submission');
	}
	else {
		db.select('email', 'hash').from('login').where('email', email)
			.then(data => {
				if (bcrypt.compareSync(password, data[0].hash)) {
					db.select('*').from('users').where('email', email) // return?
						.then(user => {
							res.json(user[0]);
						})
						.catch(error => {
							res.status(400).json('unable to get user');
						});
				}
				else {
					res.status(400).json('wrong credentials');
				}
			})
			.catch(error => {
				res.status(400).json('unable to sign in');
			});
		}
}

module.exports = {
	handleSignin
};
