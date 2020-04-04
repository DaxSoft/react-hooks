// ------------------------------------------------------------------
// | [general]
// ------------------------------------------------------------------

import React from 'react'

import { Chip, Typography, Tooltip } from '@material-ui/core'
import GradeIcon from '@material-ui/icons/Grade'

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
        justifyItems: 'flex-start',
        alignItems: 'flex-start',
    },

    title: {
        width: '95%',
        textAlign: 'left',
    },

    description: {
        maxWidth: '95%',
        textAlign: 'left',
    },

    stars: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, max-content)',
        justifyContent: 'space-evenly',
        justifyItems: 'center',
        alignItems: 'center',
        gridGap: '.5em',
        background: THEME.linerGradient('-180deg', [
            ['#f0f3f6', 0],
            ['#e6ebf1', 90],
        ]),
        borderColor: 'rgba(27,31,35,.35)',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderRadius: '2px',
        padding: '3px 10px',
        backgroundPosition: '-.5em',
    },

    column: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, max-content)',
        gridGap: '1em',
        justifyContent: 'space-evenly',
        justifyItems: 'center',
        alignItems: 'center',
    },
}))

// ------------------------------------------------------------------
// | [Component]
// ------------------------------------------------------------------

const Component = ({ item }) => {
    const classes = rootStyles()
    const title = item.name
    const description = item.description
    const stars = item.stargazers_count
    const language = item.language
    return (
        <div className={classes.root} style={{ alignSelf: 'center' }}>
            <Typography
                variant="button"
                noWrap={true}
                className={classes.title}
            >
                {title}
            </Typography>
            <Tooltip arrow={true} title={description}>
                <Typography
                    variant="caption"
                    noWrap={true}
                    className={classes.description}
                >
                    {description}
                </Typography>
            </Tooltip>
            <div className={classes.column}>
                <Chip label={language} variant="outlined" size="small" />
                <div className={classes.stars}>
                    <GradeIcon style={{ width: '16px', height: '16px' }} />
                    <Typography variant="button" style={{ fontSize: '12px' }}>
                        {stars}
                    </Typography>
                </div>
            </div>
        </div>
    )
}

// ------------------------------------------------------------------
// | [Export]
// ------------------------------------------------------------------

export default Component
