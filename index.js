const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// User: dbuser1
// Pass: HelloBangladesh123
// Use Middleware:
const cors = require('cors');
app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://dbuser1:HelloBangladesh123@ph-5.b3v7f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
        try {
                await client.connect();
                const userCollection = client.db("foodExpress").collection("user");

                //Post User or Add User:
                app.post('/user', async (req, res) => {
                        const newUser = req.body;
                        console.log("New User: ", newUser);
                        const addNewUser = await userCollection.insertOne(newUser);
                        res.send(addNewUser);
                })

                //Get User or Load User:
                app.get('/user', async (req, res) => {
                        const query = {};
                        const cursor = userCollection.find(query);
                        const users = await cursor.toArray();
                        res.send(users);
                })

                // Delete User:
                const ObjectId = require('mongodb').ObjectId;
                app.delete('/user/:id', async (req, res) => {
                        const id = req.params.id;
                        const query = { _id: ObjectId(id) };
                        const deleteItem = await userCollection.deleteOne(query);
                        res.send(deleteItem);
                })
        }
        finally {
                //await client.close();
        }
}
run().catch(console.dir)


app.get('/', (req, res) => {
        res.send("Running CRUD Operation via Node");
})

app.listen(port, (req, res) => {
        console.log("Running Crud Operation");
})