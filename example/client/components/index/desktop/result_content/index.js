// ------------------------------------------------------------------
// | [general]
// ------------------------------------------------------------------

import React from 'react'

import UserComponent from './user';
import RepositoryComponent from './repository'
import ControlComponent from './control'

// ------------------------------------------------------------------
// | [Styles]
// ------------------------------------------------------------------

import { makeStyles } from '@material-ui/core/styles'
import { THEME, CONSTANTS } from '../../../../styles'

const rootStyles = makeStyles((theme) => ({
    root: {
        display: 'grid',
        gridTemplateColumns: '6em 12em 4em',
        gridGap: '1.5em',
        justifyContent: 'space-evenly',
        justifyItems: 'flex-start',
        alignItems: 'center',
        borderRadius: '1em',
        boxShadow: THEME.BOX_SHADOW.light(),
        padding: theme.spacing(CONSTANTS.SPACING.SMALL),
        transition: 'all .3s ease-in',
        '&:hover': {
            boxShadow: THEME.BOX_SHADOW.float(),
        },
    },
}))



// ------------------------------------------------------------------
// | [Component]
// ------------------------------------------------------------------





const Component = ({item, cacheSearch }) => {
    const classes = rootStyles()

    return (
        <div className={classes.root}>
            <UserComponent item={item} />
            <RepositoryComponent item={item} />
            <ControlComponent item={item} cacheSearch={cacheSearch} />
        </div>
    )
}

// ------------------------------------------------------------------
// | [Export]
// ------------------------------------------------------------------

export default Component
