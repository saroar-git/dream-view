const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 5000;
const stripe = require("stripe")(process.env.PAYMENT_KEY);
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// middleware
const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());

const verifyJWT = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).send({ error: true, message: 'Unauthorized access' });
  } else {
    const token = authorization.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
      if (error) {
        return res.status(401).send({ error: true, message: 'Unauthorized access' });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  }
};

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.dzhlcpb.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const usersCollection = client.db('DreamDB').collection('users');
    const classesCollection = client.db('DreamDB').collection('classes');
    const bookCollection = client.db('DreamDB').collection('books');
    const paymentCollection = client.db('DreamDB').collection('payments');
    const instructorsCollection = client.db('DreamDB').collection('instructors');

    // handle JWT
    app.post('/jwt', (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
      res.send(token);
    });

    // save user data
    app.post('/users', async (req, res) => {
      const user = req.body;
      const query = { email: user.email };
      const existingUser = await usersCollection.findOne(query);

      if (existingUser) {
        return res.send({ message: 'User already exists' });
      } else {
        const result = await usersCollection.insertOne(user);
        res.send(result);
      }
    });

    // get users
    app.get('/users', async (req, res) => {
      const result = await usersCollection.find().toArray();
      res.send(result);
    });

    // get user by email
    app.get('/users/admin/:email', verifyJWT, async (req, res) => {
      const email = req.params.email;

      if (req.decoded.email !== email) {
        res.send({ admin: false });
      }

      const query = { email: email };
      const user = await usersCollection.findOne(query);
      const result = { admin: user?.role === 'admin' };
      res.send(result);
    });

    // get instructor by email
    app.get('/users/instructor/:email', verifyJWT, async (req, res) => {
      const email = req.params.email;

      if (req.decoded.email !== email) {
        res.send({ instructor: false });
      }

      const query = { email: email };
      const user = await usersCollection.findOne(query);
      const result = { instructor: user?.role === 'instructor' };
      res.send(result);
    });

    // get user by role
    app.get('/users/role/:email', async (req, res) => {
      const email = req.params.email;

      const query = { email: email };
      const user = await usersCollection.findOne(query);
      const result = { role: user?.role };
      res.send(result);
    });

    // update user role as admin
    app.patch('/users/admin/:id', async (req, res) => {
      const id = req.params.id;
      const role = req.body.role;

      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: { role: role }
      };
      const result = await usersCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    // update user role as instructor
    app.patch('/users/instructor/:id', async (req, res) => {
      const id = req.params.id;
      const role = req.body.role;

      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: { role: role }
      };
      const result = await usersCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    // remove user
    app.delete('/users/admin/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await usersCollection.deleteOne(query);
      res.send(result);
    });

    // get instructors
    app.get('/instructors', async (req, res) => {
      const result = await instructorsCollection.find().toArray();
      res.send(result);
    });

    // get instructor posted classes
    app.get('/instructors/classes/:email', async (req, res) => {
      const email = req.params.email;

      const query = { email: email };
      const result = await classesCollection.find(query).toArray();
      res.send(result);
    });

    // post instructor
    app.post('/instructors', async (req, res) => {
      const instructor = req.body;
      const query = { email: instructor.email };
      const existingUser = await instructorsCollection.findOne(query);

      if (existingUser) {
        return res.send({ message: 'Instructor already exists' });
      } else {
        const result = await instructorsCollection.insertOne(user);
        res.send(result);
      }
    });

    // delete instructor
    app.delete('/instructors/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await instructorsCollection.deleteOne(query);
      res.send(result);
    });

    // get classes
    app.get('/classes', async (req, res) => {
      const result = await classesCollection.find().toArray();
      res.send(result);
    });

    // post class
    app.post('/classes', async (req, res) => {
      const singleClass = req.body;
      const result = await classesCollection.insertOne(singleClass);
      res.send(result);
    });

    // make class status approve by admin
    app.patch('/classes/:id', async (req, res) => {
      const id = req.params.id;
      const status = req.body.status;

      const filter = { _id: new ObjectId(id) };
      const updateDoc = { $set: { status: status }, };
      const result = await classesCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    // get data by id for feedback
    app.get('/classes/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) }
      const result = await classesCollection.findOne(filter);
      res.send(result)
    })

    // feedback by admin
    app.patch("/classes/feedback/:id", async (req, res) => {
      const id = req.params.id;
      const feedback = req.body.feedback;

      const query = { _id: new ObjectId(id) };
      const updateData = {
        $set: { feedback: feedback },
      };

      const result = await classesCollection.updateOne(query, updateData);
      res.send(result);
    });

    // make class quantity update after payment
    app.patch('/classes/available/:id', async (req, res) => {
      const id = req.params.id;
      const available = req.body.available;

      const filter = { _id: new ObjectId(id) };
      const updateDoc = { $inc: { available: available } };
      const result = await classesCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    // get booking class
    app.get('/book', async (req, res) => {
      const email = req.query.email;

      if (!email) {
        res.send([]);
      }
      const query = { email: email };
      const result = await bookCollection.find(query).toArray();
      res.send(result);
    });

    // add booking classes
    app.post('/book', async (req, res) => {
      const item = req.body;
      const result = await bookCollection.insertOne(item);
      res.send(result);
    });

    // delete booking class
    app.delete('/book/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await bookCollection.deleteOne(query);
      res.send(result);
    });

    // handle payments
    app.post('/create-payment-intent', verifyJWT, async (req, res) => {
      const { price } = req.body;
      const amount = parseInt(price * 100);
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd',
        payment_method_types: ['card']
      });

      res.send({
        clientSecret: paymentIntent.client_secret
      });
    });

    // set payment data
    app.post('/payments', verifyJWT, async (req, res) => {
      const payment = req.body;
      const books = req.body.books;
      const insertResult = await paymentCollection.insertOne(payment);

      const query = { _id: { $in: books.map(book => new ObjectId(book._id)) } };
      const deleteResult = await bookCollection.deleteOne(query);

      res.send({ insertResult, deleteResult });
    });

    // get enrolled class data 
    app.get('/payment/class/:email', verifyJWT, async (req, res) => {
      const email = req.params.email;

      const result = await paymentCollection.find({ 'books.email': email }).toArray();
      const books = result.flatMap((order) => order.books.filter((book) => book.email === email));
      res.send(books);
    });

    // get payment data
    app.get('/payment/:email', verifyJWT, async (req, res) => {
      const email = req.params.email;

      const result = await paymentCollection.find({ 'payment.email': email }).toArray();

      const payments = result.map((order) => order.payment);
      res.send(payments);
    });

    // after payment increase enroll
    app.patch('/classes/enroll/:id', async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const enroll = parseFloat(req.body.enroll);
      const updateDoc = { $inc: { enroll: enroll } };

      const result = await classesCollection.updateOne(filter, updateDoc);
      res.send(result);
    });


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Learning is running..');
});

app.listen(port, () => {
  console.log(`Learning is running on port: ${port}`);
});
