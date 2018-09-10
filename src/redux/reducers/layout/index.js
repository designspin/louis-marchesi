const defaultState = {
    navOpen: false,
}

export default function(state = defaultState, action) {
    switch(action.type) {
        case 'NAV_TOGGLE':
            return Object.assign({}, state, { navOpen: !state.navOpen });
        default:
            return state;
    }
}