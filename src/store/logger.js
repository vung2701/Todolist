
function logger (reducer) {
    return (prevState, action) => {
        console.group(action.type)
        console.log('Prev state: ', prevState)

        const nextState = reducer(prevState, action)

        console.log('Next state: ', prevState)
        console.groupEnd()
        return nextState
    }
}

export default logger