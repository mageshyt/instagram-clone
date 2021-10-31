import Head from "next/head";
import Feed from "../components/Feed";
import Header from "../components/Header";

export default function Home() {
  return (
    <div className="h-screen overflow-y-scroll scrollbar-hide">
      <Head>
        <title>Instagram build</title>
      </Head>
      {/* Header */}
      <Header />
      {/* Feed */}
      <Feed />
    </div>
  );
}
