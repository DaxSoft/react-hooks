// ------------------------------------------------------------------
// | [Import]
// ------------------------------------------------------------------

// * General
import React from "react";
import Head from "next/head";
import loadable from "@loadable/component";

import { useScreenSize } from "@vorlefan/react-hooks";

// * Components

const IndexDesktop = loadable(() => import("../components/index/desktop"));
const IndexMobile = loadable(() => import("../components/index/mobile"));

// * Static

// ------------------------------------------------------------------
// | [Styles]
// ------------------------------------------------------------------

// ------------------------------------------------------------------
// | [Handlers]
// ------------------------------------------------------------------

const Desktop = ({}) => {
  return (
    <div>
      <IndexDesktop />
    </div>
  );
};

const Mobile = ({}) => {
  return (
    <div>
      <IndexMobile />
    </div>
  );
};

// ------------------------------------------------------------------
// | [Page]
// ------------------------------------------------------------------

const Page = ({}) => {
  const screenSize = useScreenSize(
    {
      innerWidth: 640,
      innerHeight: 1360,
      orientation: "portrait",
    },
    [0.95, 1.5]
  );

  return (
    <>
      <Head>
        <title>Vorlefan / React Hooks</title>
      </Head>

      {screenSize.orientation === "landscape" ? <Desktop /> : <Mobile />}
    </>
  );
};

// ------------------------------------------------------------------
// | [Export]
// ------------------------------------------------------------------

export default Page;
