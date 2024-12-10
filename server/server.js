// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const customerRoutes = require('./routes/customerRoutes'); // Import the router
const cors = require('cors');
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
// MongoDB connection
mongoose.connect("mongodb+srv://sameekshasihare:6djTexgO5gwziE2n@cluster0.it52g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));


// Use the customer routes
app.use('/api/customers', customerRoutes);  // Prefixing the routes with '/api/customers'

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
