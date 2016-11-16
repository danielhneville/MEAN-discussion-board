var express = require('express'),
	app = express();

var path = require('path'),
	bp = require('body-parser');

app.use(express.static(path.join(__dirname, './client')));
app.use(express.static(path.join(__dirname, './bower_components')))

app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);

app.listen(8000, function(){
	console.log('running on port 8000');
})

