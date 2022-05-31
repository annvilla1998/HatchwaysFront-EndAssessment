import tagsData from '../data/data.json'

const GETTAGS = 'tag/GETTAGS'
const ADDTAG = 'tag/ADDTAG';

export const getTags = () => ({
    type: GETTAGS,
    tagsData
})

export const addTag = (tag) => ({
    type: ADDTAG,
    tag
}) 

const tagReducer = (state={}, action) => {
    switch(action.type) {
        case GETTAGS: {
            const newState = { ...state }
            action.tagsData.tags.forEach(tag => (
                newState[tag.id] = tag
            ))
            return newState
        }
        case ADDTAG: {
            const newState = { ...state }
            newState[action.tag.id] = action.tag
            return newState
        }
        default: 
            return state
    }
}

export default tagReducer