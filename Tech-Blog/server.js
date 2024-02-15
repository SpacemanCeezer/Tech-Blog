const express = require('express');
const session = require('express-session');
const path = require('path');
const homeRoutes = require('./controllers/homeController');
const apiRoutes = require('./controllers/api-routes');
const dashboardRoutes = require('./controllers/dashboard-routes');
const sequelize = require('./config/connection');
const sess = require('./config/session');

const PORT = process.env.PORT || 3000;
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess));

// Routes
app.use('/', homeRoutes);
app.use('/api', apiRoutes);
app.use('/dashboard', dashboardRoutes);

// Sync Sequelize models and start server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
