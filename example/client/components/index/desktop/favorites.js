// ------------------------------------------------------------------
// | [general]
// ------------------------------------------------------------------

import React from 'react'

import ResultContentComponent from './result_content'

// ------------------------------------------------------------------
// | [Styles]
// ------------------------------------------------------------------

import { makeStyles } from '@material-ui/core/styles'
import { THEME, CONSTANTS } from '../../../styles'

const rootStyles = makeStyles((theme) => ({
    root: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, max-content)',
        gridGap: '1em',
        justifyContent: 'space-evenly',
        justifyItems: 'center',
        alignItems: 'center',
        justifySelf: 'flex-start',
        alignSelf: 'flex-start',
        width: 'inherit',
        borderStyle: 'solid',
        borderWidth: '2px',
        borderRadius: '2em',
        borderColor: THEME.NEUTRAL_COLOR.neutralTransitionPrimary,
        padding: theme.spacing(CONSTANTS.SPACING.BIG)
    },
}))

// ------------------------------------------------------------------
// | [Component]
// ------------------------------------------------------------------

const Component = ({ cacheSearch }) => {
    const classes = rootStyles()

    const items = cacheSearch.state.favorites

    return (
        <div className={classes.root}>
            {Array.isArray(items) &&
                items.length > 0 &&
                items.map((item, key) => (
                    <ResultContentComponent
                        key={key}
                        item={item}
                        cacheSearch={cacheSearch}
                    />
                ))}
        </div>
    )
}

// ------------------------------------------------------------------
// | [Export]
// ------------------------------------------------------------------

export default Component
