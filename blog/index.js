const app = require('./app');
const { info } = require('./utils/logger');
const { PORT } = require('./utils/config');

app.listen(PORT, () => {
  info('Running on Port', PORT);
});
