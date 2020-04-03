// ------------------------------------------------------------------
// | [general]
// ------------------------------------------------------------------

import React from "react";

import { Avatar, Typography, IconButton } from "@material-ui/core";

// ------------------------------------------------------------------
// | [Styles]
// ------------------------------------------------------------------

import { makeStyles } from "@material-ui/core/styles";
import { THEME, CONSTANTS } from "../../../styles";

const rootStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
    gridTemplateRows: "max-content",
    gridGap: "1em",
    justifyContent: "space-evenly",
  },
}));

const contentStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
    gridTemplateColumns: "4em 16em 6em",
    gridGap: ".5em",
    justifyContent: "space-between",
    justifyItems: "flex-start",
    alignItems: "flex-start",
    borderRadius: "1em",
    boxShadow: THEME.BOX_SHADOW.light(),
    padding: theme.spacing(CONSTANTS.SPACING.SMALL),
    transition: "all .3s ease-in",
    "&:hover": {
      boxShadow: THEME.BOX_SHADOW.float(),
    },
  },

  avatar: {
    width: "4em",
    height: "4em",
    justifySelf: "center",
    alignSelf: "center",
  },

  row: {
    display: "grid",
    gridTemplateRows: "max-content",
    gridGap: ".5rem",
    justifyContent: "space-evenly",
    justifyItems: "flex-start",
    alignItems: "flex-start",
  },

  title: {
    width: "16em",
    textAlign: "left",
  },

  description: {
    width: "15em",
    textAlign: "left",
  },
}));

// ------------------------------------------------------------------
// | [Handlers]
// ------------------------------------------------------------------

// ------------------------------------------------------------------
// | [Component]
// ------------------------------------------------------------------

const Content = ({ item, cacheSearch }) => {
  const classes = contentStyles();
  const cover = item.owner.avatar_url;
  const name = item.owner.login;
  const title = item.name;
  const description = item.description;
  return (
    <div className={classes.root}>
      <div className={classes.row}>
        <Avatar src={cover} className={classes.avatar} />
        <Typography variant="button" style={{ fontSize: ".8rem" }}>
          {name}
        </Typography>
      </div>
      <div className={classes.row}>
        <Typography variant="button" noWrap={true} className={classes.title}>
          {title}
        </Typography>
        <Typography
          variant="caption"
          noWrap={true}
          className={classes.description}
        >
          {description}
        </Typography>
      </div>
      <div />
    </div>
  );
};

const Component = ({ data, cacheSearch }) => {
  const classes = rootStyles();

  return (
    <div className={classes.root}>
      {Array.isArray(data.item) &&
        data.item.length > 0 &&
        data.item.map((item, key) => (
          <Content key={key} item={item} cacheSearch={cacheSearch} />
        ))}
    </div>
  );
};

// ------------------------------------------------------------------
// | [Export]
// ------------------------------------------------------------------

export default Component;
