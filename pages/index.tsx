import type { NextPage } from "next";
import Head from "next/head";
import Body from "./Body";
import React from "react";

const dev = process.env.NODE_ENV !== "production";

export const server = dev
  ? "http://localhost:3000"
  : "https://your_deployment.server.com";

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
