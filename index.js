const express = require('express');
const helmet = require("helmet");
const app = express();
const PORT = process.env.PORT || 5000;
const logger = require('./middleware/logger');

// middleware
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(logger);

// routes
app.use('/', require('./routes/index'));
app.use('/members', require('./routes/members'));

app.use((req, res, next) => {
	res.status(404).send("Not found!")
});

app.use((err, req, res, next) => {
	console.error(err);
	res.status(500).send('Something broke!')
});

// server
app.listen(PORT, () => console.log('Listening on port %d', PORT));
