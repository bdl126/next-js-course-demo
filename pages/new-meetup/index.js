import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment } from "react";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

const NewMeetup = () => {
  const route = useRouter();

  const onAddMeetupHandler = async (enteredMeetupData) => {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      header: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);
    route.replace("/");
  };

  return (
    <Fragment>
      <Head>
        <title>Add a new meetup</title>
        <meta name='description' content="Add your own meetup and create amazong networking event"/>
      </Head>
      <NewMeetupForm onAddMeetup={onAddMeetupHandler} />
    </Fragment>
  );
};

export default NewMeetup;
