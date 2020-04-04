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
        gridTemplateRows: 'max-content',
        gridGap: '1em',
        justifyContent: 'space-evenly',
    },
}))

// ------------------------------------------------------------------
// | [Component]
// ------------------------------------------------------------------

const Component = ({ data, cacheSearch }) => {
    const classes = rootStyles()

    return (
        <div className={classes.root}>
            {Array.isArray(data.items) &&
                data.items.length > 0 &&
                data.items.map((item, key) => (
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
