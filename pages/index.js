import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import { Fragment } from "react";

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name="Descritiption" content="Browse meetups"/>
      </Head>
      <MeetupList meetups={props.meetups} />;
    </Fragment>
  );
};

// export async function getServerSideProps(context) {
//   const req = context.req
//   const res = context.res
//   //fetch data from API
//   return {
//     props:{
//       meetups: DUMMY_MEETUPS
//     }
//   }
// }

export async function getStaticProps() {
  //fetch data from api or data base

  const client = await MongoClient.connect(
    "mongodb+srv://admin-bruno:aFucsvIRapUX4PfW@cluster0.o3vpt.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  console.log(meetups);

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
