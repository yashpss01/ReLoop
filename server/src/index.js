const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });
const app = require('./app');

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
