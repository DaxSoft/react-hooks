// ------------------------------------------------------------------
// | [general]
// ------------------------------------------------------------------

import React, { useState } from 'react'

// * Components

import { Typography } from '@material-ui/core'

// * Static


// ------------------------------------------------------------------
// | [Styles]
// ------------------------------------------------------------------
import { makeStyles } from '@material-ui/core/styles'
import { THEME, CONSTANTS } from '../../../styles'

const rootStyles = makeStyles(theme => ({
    root: {
        display: 'grid',
        gridTemplateRows: 'max-content',
        gridGap: '3em',
        justifyContent: 'flex-start',
        justifyItems: 'flex-start',
        padding: theme.spacing(CONSTANTS.SPACING.BIG),
        width: '99vw',
    }
}))

// ------------------------------------------------------------------
// | [Handlers]
// ------------------------------------------------------------------

// ------------------------------------------------------------------
// | [Component]
// ------------------------------------------------------------------

const Component = ({ }) => {
    
    const classes = rootStyles()

    return (
        <div className={classes.root}>
            <Typography variant='h4'>
                Mobile version needs to be done xD
            </Typography>
        </div>
    )
}

// ------------------------------------------------------------------
// | [Export]
// ------------------------------------------------------------------

export default Component
