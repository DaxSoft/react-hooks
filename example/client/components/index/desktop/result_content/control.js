// ------------------------------------------------------------------
// | [general]
// ------------------------------------------------------------------

import React from 'react'
import { useBoolean } from '@vorlefan/react-hooks'
import { Tooltip, IconButton } from '@material-ui/core'

import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder' // no favorite
import BookmarkIcon from '@material-ui/icons/Bookmark' // favorite
import LinkIcon from '@material-ui/icons/Link' // goto

// ------------------------------------------------------------------
// | [Styles]
// ------------------------------------------------------------------

import { makeStyles } from '@material-ui/core/styles'
import { THEME, CONSTANTS } from '../../../../styles'

const rootStyles = makeStyles((theme) => ({
    root: {
        display: 'grid',
        gridTemplateRows: 'max-content',
        gridGap: '1rem',
        justifyContent: 'space-evenly',
        justifyItems: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
}))

// ------------------------------------------------------------------
// | [Component]
// ------------------------------------------------------------------

const Component = ({ item, cacheSearch }) => {
    const classes = rootStyles()

    function handleBookmark() {
        if (isBookmarked.isOn()) {
            cacheSearch.set('favorites', [
                ...cacheSearch.state.favorites.filter(
                    (el) => el.id !== item.id
                ),
            ])
            return isBookmarked.off()
        } else {
            cacheSearch.set('favorites', [...cacheSearch.state.favorites, item])
            return isBookmarked.on()
        }
    }

    function checkBookmark(id) {
        return !!cacheSearch.state.favorites.find(
            (element) => element.id === id
        )
    }

    const isBookmarked = useBoolean(checkBookmark(item.id))

    const href = item.html_url

    return (
        <div className={classes.root}>
            <IconButton onClick={handleBookmark} color="secondary">
                {isBookmarked.isOn() ? (
                    <Tooltip arrow={true} title="Remove from Favorites">
                        <BookmarkIcon />
                    </Tooltip>
                ) : (
                    <Tooltip arrow={true} title="Add to Favorites">
                        <BookmarkBorderIcon />
                    </Tooltip>
                )}
            </IconButton>
            <IconButton target="_blank" href={href} color="inherit">
                <LinkIcon />
            </IconButton>
        </div>
    )
}

// ------------------------------------------------------------------
// | [Export]
// ------------------------------------------------------------------

export default Component
