import { MongoClient } from "mongodb";

// /api/new-meetup
// POST /api/new-meetup

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://btguin:Zz061188!@cluster0.cdy2w81.mongodb.net/?retryWrites=true&w=majority"
    );

    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    //store data in db

    client.close();

    //send response

    res.status(201).json({ message: "Meetup inserted!" });
  }
}

export default handler;
