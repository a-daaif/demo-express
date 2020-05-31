const mongoose = require('mongoose');


const URI = "mongodb://localhost/enset";


mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true});

