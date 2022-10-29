module.exports = (req, res, next) => {
	if (req.session.loggedin) {
		// Output username
		next();
	} else {
		// Not logged in
		return res.redirect('/login')
	}
};