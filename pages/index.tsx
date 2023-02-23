import type { NextPage } from "next";
import Head from "next/head";
import Body from "./Body";
import React from "react";

// export const server =  "http://localhost:3000"
export const server = "https://chat-app-binh-hu.herokuapp.com";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Chat app</title>
        <meta name="description" content="" />
      </Head>
      <Body />
    </div>
  );
};

export default Home;
