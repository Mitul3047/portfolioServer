
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 3000; // Use process.env.PORT or default to 3000

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.zkhcmhi.mongodb.net/?retryWrites=true&w=majority`;

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
    const feedbackCollection = client.db("myWebsite").collection("feedback");

 
    app.get('/users', async (req, res) => {
        const cursor = feedbackCollection.find();
        const result = await cursor.toArray();
        res.send(result)
    })
    app.get('/users/:id', async (req, res) => {
        const id = req.params.id;
        const query = {_id: new ObjectId(id)}
        const result = await feedbackCollection.findOne(query)
        res.send(result)
    })
    app.post('/users', async (req, res) => {
        const users = req.body;
        console.log(users);
        const result = await feedbackCollection.insertOne(users);
        res.send(result);
    });
    
  //   app.delete('/users/:id', async (req, res) => {
  //       const id = req.params.id;
  //       console.log(id);
  //       const query = { _id: new ObjectId(id) }
  //       const result = await feedbackCollection.deleteOne(query);
  //       res.send(result);
        
  //   })
  //   app.patch('/users/:id', async (req, res) => {
  //     try {
  //         const id = req.params.id;
  //         const { name, email, photoURL, number, city, state } = req.body;
  
  //         const query = { _id: new ObjectId(id) };
  //         const updateData = {
  //             $set: {
  //                 name,
  //                 email,
  //                 photoURL,
  //                 number,
  //                 city,
  //                 state
  //                 // Add other fields here that you want to update
  //             }
  //         };
  
  //         const result = await feedbackCollection.updateOne(query, updateData);
          
  //         if (result.modifiedCount > 0) {
  //             res.status(200).json({ message: 'User updated successfully' });
  //         } else {
  //             res.status(404).json({ message: 'User not found or no changes made' });
  //         }
  //     } catch (error) {
  //         console.error("Error updating user:", error);
  //         res.status(500).json({ message: 'Failed to update user' });
  //     }
  // });
  
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
  res.send('MyPortfolio')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



