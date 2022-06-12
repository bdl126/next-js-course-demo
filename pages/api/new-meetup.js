import { MongoClient } from "mongodb";

// api/new-meetup
// ONLY POST will trig this code

async function handler(req, res) {
  // console.log(req);
  if (req.method === "POST") {
    const data = JSON.parse(req.body);
    const client = await MongoClient.connect(
      "mongodb+srv://admin-bruno:aFucsvIRapUX4PfW@cluster0.o3vpt.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    const db = client.db();
    const meetupsCollection = db.collection("meetups");
    // console.log(client);

    // console.log(meetupsCollection);
    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    await client.close();

    res.status(201).json({ message: "Meetup inserted!" });
  }
}

export default handler;
