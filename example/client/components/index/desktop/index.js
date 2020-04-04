// ------------------------------------------------------------------
// | [general]
// ------------------------------------------------------------------

import React, { useEffect } from 'react'
import fetch from 'isomorphic-unfetch'
import { useObject, useLocalStorage, useFetch } from '@vorlefan/react-hooks'

import { Typography, CircularProgress } from '@material-ui/core'
import SearchComponent from './search'
import ResultComponent from './result'
import FavoritesComponent from './favorites'

// ------------------------------------------------------------------
// | [Styles]
// ------------------------------------------------------------------

import { makeStyles } from '@material-ui/core/styles'
import { THEME, CONSTANTS } from '../../../styles'

const rootStyles = makeStyles((theme) => ({
    root: {
        display: 'grid',
        gridTemplateRows: 'max-content',
        gridGap: '3em',
        justifyContent: 'flex-start',
        justifyItems: 'flex-start',
        padding: theme.spacing(CONSTANTS.SPACING.BIG),
        width: '99vw',
    },
    column: {
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
        gridGap: '3em',
        justifyContent: 'space-between',
        justifyItems: 'flex-start',
        alignItems: 'flex-start',
        width: '100%',
    },
}))

// ------------------------------------------------------------------
// | [Component]
// ------------------------------------------------------------------

const Component = ({}) => {
    const classes = rootStyles()

    const cacheLocalStorage = useLocalStorage('vorlefan_react_hooks_example', {
        favorites: [],
        fetch: {},
    })
    const cacheSearch = useObject(
        { favorites: [], fetch: {} },
        cacheLocalStorage.get()
    )

    useEffect(() => {
        cacheLocalStorage.set(cacheSearch.state)
    }, [cacheSearch.state])

    const searchAPI = useFetch(
        {
            endpoint: 'https://api.github.com/search/repositories',
            query: {
                q: 'path_route',
                page: 1,
                per_page: 9,
            },
            start: false,
            stateInit: cacheSearch.state.fetch,
            onSuccess: function (data) {
                cacheSearch.set('fetch', data)
            },
        },
        'GET',
        fetch
    )

    return (
        <div className={classes.root}>
            <Typography variant="h6">
                Example using all hooks | APIs from Github
            </Typography>
            <Typography variant="subtitle1">
                Type to search a repository <br />
                Number of Favorites is:{' '}
                <strong>{cacheSearch.state.favorites.length}</strong>
            </Typography>
            <SearchComponent searchAPI={searchAPI} cacheSearch={cacheSearch} />
            <div className={classes.column}>
                {searchAPI.loading.isOn() ? (
                    <CircularProgress color="secondary" />
                ) : !searchAPI.error ? (
                    <ResultComponent
                        data={searchAPI.data}
                        cacheSearch={cacheSearch}
                    />
                ) : (
                    <Typography variant="body1">
                        It's seems that a error has happened! <br />
                        Probally you exceeded the rate limit of Github. <br />
                        Try to refresh the page with F5 and wait a little to
                        search again :)
                    </Typography>
                )}
                <FavoritesComponent cacheSearch={cacheSearch} />
            </div>
        </div>
    )
}

// ------------------------------------------------------------------
// | [Export]
// ------------------------------------------------------------------

export default Component
