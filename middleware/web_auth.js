module.exports = (req, res, next) => {
	if (req.session.loggedin) {
		// Output username
		next();
	} else {
		// Not logged in
		const lang = req.params.lang;
		return res.redirect(`/${lang}/login`) 
	}
};