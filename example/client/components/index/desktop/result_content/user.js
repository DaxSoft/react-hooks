// ------------------------------------------------------------------
// | [general]
// ------------------------------------------------------------------

import React from 'react'

import { Tooltip, Avatar, Typography } from '@material-ui/core'

// ------------------------------------------------------------------
// | [Styles]
// ------------------------------------------------------------------

import { makeStyles } from '@material-ui/core/styles'
import { THEME, CONSTANTS } from '../../../../styles'

const rootStyles = makeStyles((theme) => ({
    root: {
        display: 'grid',
        gridTemplateRows: 'max-content',
        gridGap: '.5rem',
        justifyContent: 'space-evenly',
        justifyItems: 'center',
        alignItems: 'center',
    },

    avatar: {
        width: '3.5em',
        height: '3.5em',
        justifySelf: 'center',
        alignSelf: 'center',
    },

    username: {
        fontSize: '.8rem',
        textAlign: 'center',
        justifySelf: 'center',
        alignSelf: 'center',
        maxWidth: '99%',
    },
}))

// ------------------------------------------------------------------
// | [Component]
// ------------------------------------------------------------------

const Component = ({ item }) => {
    const classes = rootStyles()
    const cover = item.owner.avatar_url
    const name = item.owner.login
    return (
        <div className={classes.root}>
            <Avatar src={cover} className={classes.avatar} />
            <Tooltip arrow={true} title={name}>
                <Typography
                    variant="button"
                    className={classes.username}
                    noWrap={true}
                >
                    {name}
                </Typography>
            </Tooltip>
        </div>
    )
}

// ------------------------------------------------------------------
// | [Export]
// ------------------------------------------------------------------

export default Component
