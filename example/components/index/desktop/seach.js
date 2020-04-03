// ------------------------------------------------------------------
// | [general]
// ------------------------------------------------------------------

import React from "react";

import { TextField } from "@material-ui/core";

// ------------------------------------------------------------------
// | [Styles]
// ------------------------------------------------------------------

import { makeStyles } from "@material-ui/core/styles";
import { THEME, CONSTANTS } from "../../../styles";

const rootStyles = makeStyles((theme) => ({
  root: {},
}));

// ------------------------------------------------------------------
// | [Handlers]
// ------------------------------------------------------------------

// ------------------------------------------------------------------
// | [Component]
// ------------------------------------------------------------------

const Component = ({ searchAPI, cacheSearch }) => {
  const classes = rootStyles();

  function handleChange({ target }) {
    const value = target.value.trimLeft();
    searchAPI.queries.set("q", value);
    searchAPI.refresh.on();
  }

  return (
    <div className={classes.root}>
      <TextField
        name="search-repository"
        id="search"
        onChange={handleChange}
        value={searchAPI.queries.state.q}
        variant='outlined'
      />
    </div>
  );
};

// ------------------------------------------------------------------
// | [Export]
// ------------------------------------------------------------------

export default Component;
