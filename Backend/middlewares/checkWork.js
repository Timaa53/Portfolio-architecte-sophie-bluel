module.exports = (req, res, next) => {
  	try {
		const BASE_URL = process.env.BASE_URL || "https://sophie-bluel-architecte-5xpa.onrender.com";

    	const title = req.body.title?.trim() || undefined;
    	const categoryId = parseInt(req.body.category) || undefined;
    	const userId = req.auth.userId || undefined;
    	const imageUrl = `${BASE_URL}/images/${req.file.filename}` || undefined;

    	console.log(title, categoryId, userId, imageUrl);

    	if (
      		title &&
      		title.length > 0 &&
      		categoryId &&
      		categoryId > 0 &&
      		userId &&
      		userId > 0 &&
      		imageUrl
    	) {
      		req.work = { title, categoryId, userId, imageUrl };
      		next();
    	} else {
      		return res.status(400).json({ error: new Error("Bad Request") });
    	}
  	} catch (e) {
    	return res.status(500).json({ error: new Error("Something wrong occurred") });
  	}
};
