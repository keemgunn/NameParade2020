const express = require('express');
const path = require('path');



// ---------------- ROUTES
const init = require('./routes/init');



// ---------------- APP SETTING
const app = express();
app.use(express.json({
  limit: "50mb"
}));
app.use(express.text({
  defaultCharset:"utf-8",
  limit: "50mb"
}));



// ---------------- SERVE
app.use(express.static(path.join(__dirname, 'public')));
app.use('/init', init);



// ---------- PORT SETTING
const port = process.env.PORT || 5500;
app.listen(port, () => console.log(`=== Listening on port ${port} ... @app.js`));