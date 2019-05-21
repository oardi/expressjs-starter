const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const logger = require('./middleware/logger');

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(logger);
app.use('/api/members', require('./routes/api/members'));
// end middleware

// middleware
app.use((req, res, next) => {
	res.status(404).send("Not found!")
});

app.use((err, req, res, next) => {
	console.error(err);
	res.status(500).send('Something broke!')
});
// end middleware

// server
app.listen(PORT, () => console.log('Listening on port %d', PORT));
