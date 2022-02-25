
const clarifai = require('clarifai');

const app = new Clarifai.App({
	// heroku
	// apiKey: process.env.API_KEY
	// localhost
 	apiKey: 'your_personal_clarifai_api_key'
 	
});

const handleApiCall = (req, res) => {
	const { input } = req.body;

    app.models.predict(Clarifai.FACE_DETECT_MODEL, input)
    	.then(data => {
    		res.json(data);
    	})
    	.catch(error => {
    		res.status(400).json('unable to work with API');
    	});
}

const handleImage = (req, res, db) => {
	const { id, faces } = req.body;

	db('users')
		.where('id', '=', id)
		.increment('entries', faces)
		.returning('entries')
		.then(entries => {
			// res.json(entries[0])
			res.json(entries[0].entries)
		})
		.catch(error => {
			res.status(400).json('unable to get entries');
		});
}

module.exports = {
	handleApiCall,
	handleImage
};
