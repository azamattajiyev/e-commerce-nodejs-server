module.exports = (req, res, next) => {
    const lang = req.params.lang;
    const langs=['tm','ru']
	if (langs.includes(lang)) {
        return  next();
    }
    return res.render('pages/error/404', {
        lang,
        layout:'./layouts/error',
        extractScripts: true,
        status:404,
        message:'Not Found',
    })
};


