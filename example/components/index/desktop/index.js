// ------------------------------------------------------------------
// | [general]
// ------------------------------------------------------------------

import React, { useEffect } from "react";
import fetch from "isomorphic-unfetch";
import { useObject, useLocalStorage, useFetch } from "@vorlefan/react-hooks";

import { Typography, CircularProgress } from "@material-ui/core";
import SearchComponent from "./seach";
import ResultComponent from "./result";

// ------------------------------------------------------------------
// | [Styles]
// ------------------------------------------------------------------

import { makeStyles } from "@material-ui/core/styles";
import { THEME, CONSTANTS } from "../../../styles";

const rootStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
    gridTemplateRows: "max-content",
    gridGap: "3em",
    justifyContent: "flex-start",
    justifyItems: "flex-start",
    padding: theme.spacing(CONSTANTS.SPACING.BIG),
  },
  column: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridGap: "1em",
    justifyContent: "space-between",
    justifyItems: "flex-start",
    alignItems: "flex-start",
    width: "99vw",
  },
}));

// ------------------------------------------------------------------
// | [Handlers]
// ------------------------------------------------------------------

// ------------------------------------------------------------------
// | [Component]
// ------------------------------------------------------------------

const Component = ({}) => {
  const classes = rootStyles();

  const cacheLocalStorage = useLocalStorage("cache", {
    favorites: [],
  });
  const cacheSearch = useObject({}, cacheLocalStorage.get());

  useEffect(() => {
    cacheLocalStorage.set(cacheSearch.state);
  }, [cacheSearch.state]);

  const searchAPI = useFetch(
    {
      endpoint: "https://api.github.com/search/repositories",
      query: {
        q: "path_route",
        page: 1,
        per_page: 3,
      },
      start: true,
      config: {
        credentials: "include",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "X-Requested-With",
        'Cookie': 'dotcom_user=DaxSoft;'
      },
    },
    "GET",
    fetch
  );

  console.log(searchAPI);


  return (
    <div className={classes.root}>
      <Typography variant="h6">
        Example using all hooks | APIs from Github
      </Typography>
      <Typography variant="subtitle1">Type to search a repository</Typography>
      <SearchComponent searchAPI={searchAPI} cacheSearch={cacheSearch} />
      <div className={classes.column}>
        {searchAPI.loading.isOn() ? (
          <CircularProgress color="secondary" />
        ) : (
          <ResultComponent data={searchAPI.data} cacheSearch={cacheSearch} />
        )}
      </div>
    </div>
  );
};

// ------------------------------------------------------------------
// | [Export]
// ------------------------------------------------------------------

export default Component;
