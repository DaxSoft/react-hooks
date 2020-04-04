// ------------------------------------------------------------------
// | [general]
// ------------------------------------------------------------------

import React from 'react'

import { TextField, IconButton } from '@material-ui/core'

import SearchIcon from '@material-ui/icons/Search'

// ------------------------------------------------------------------
// | [Styles]
// ------------------------------------------------------------------

import { makeStyles } from '@material-ui/core/styles'
import { THEME, CONSTANTS } from '../../../styles'

const rootStyles = makeStyles((theme) => ({
    root: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, max-content)',
        gridGap: '2em',
        justifyContent: 'space-evenly',
        justifyItems: 'center',
        alignItems: 'center',
        padding: theme.spacing(CONSTANTS.SPACING.SMALL),
    },

    numberField: {
        width: '6em'
    }
}))

// ------------------------------------------------------------------
// | [Handlers]
// ------------------------------------------------------------------

// ------------------------------------------------------------------
// | [Component]
// ------------------------------------------------------------------

const Component = ({ searchAPI, cacheSearch }) => {
    const classes = rootStyles()

    function handleChangeSearchName({ target }) {
        const value = target.value.trimLeft()
        searchAPI.queries.set('q', value)
    }

    function handleChangeSearchPage({ target }) {
        const value = +target.value
        searchAPI.queries.set('page', value)
    }

    function handleChangeSearchSize({ target }) {
        const value = +target.value
        searchAPI.queries.set('per_page', value)
    }

    return (
        <div className={classes.root}>
            <TextField
                name="search-repository"
                id="search"
                onChange={handleChangeSearchName}
                value={searchAPI.queries.state.q}
                variant="outlined"
                label='Rep. Name'
            />
            <TextField
                name="search-page"
                id="search-page"
                type="number"
                onChange={handleChangeSearchPage}
                value={searchAPI.queries.state.page}
                variant="outlined"
                className={classes.numberField}
                label='Page Index'
            />
            <TextField
                name="search-size"
                id="search-size"
                type="number"
                onChange={handleChangeSearchSize}
                value={searchAPI.queries.state.per_page}
                variant="outlined"
                className={classes.numberField}
                label='Page Size'
            />
            <IconButton onClick={searchAPI.refresh.on} color="secondary">
                <SearchIcon />
            </IconButton>
        </div>
    )
}

// ------------------------------------------------------------------
// | [Export]
// ------------------------------------------------------------------

export default Component
