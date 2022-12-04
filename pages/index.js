import { Fragment } from 'react';
import Head from "next/head";
import { MongoClient } from "mongodb";

import { useContext } from "react";
import MeetupList from "../components/meetups/MeetupList";

function HomePage(props) {
//this determines what is shown on the tab (head) and descriptions in Google

  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta
        name='description'
        content='Browse a huge list of highly active React meetups!'
        />
      </Head>
      <MeetupList meetups={props.meetups} />;
    </Fragment>
  );
}

// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;

//     // only use if you have data that changes multiple times every second
//     // fetch data from an API/DB

//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }

export async function getStaticProps() {
  // if don't have data that changes every second
  // fetch data from an API/DB (always need to return an object)

  const client = await MongoClient.connect(
    "mongodb+srv://btguin:Zz061188!@cluster0.cdy2w81.mongodb.net/?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

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
    // generates every x seconds on the server if there are requests coming in
  };
}

export default HomePage;
