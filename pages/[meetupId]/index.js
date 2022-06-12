import { MongoClient, ObjectId } from "mongodb";
import { Fragment } from "react";
import MeetUpDetail from "../../components/meetups/MeetupDetail";
import Head from "next/head";


const MeetUpDetails = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description}/>
      </Head>
      <MeetUpDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </Fragment>
  );
};

export async function getStaticPaths(context) {
  console.log("1");

  const client = await MongoClient.connect(
    "mongodb+srv://admin-bruno:aFucsvIRapUX4PfW@cluster0.o3vpt.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: 'blocking',
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  //fetch data for a single meetup

  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://admin-bruno:aFucsvIRapUX4PfW@cluster0.o3vpt.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const selectedMeetUp = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  client.close();
  console.log(selectedMeetUp);

  return {
    props: {
      meetupData: {
        ...selectedMeetUp,
        _id: selectedMeetUp._id.toString(),
      },
    },
  };
}

export default MeetUpDetails;
