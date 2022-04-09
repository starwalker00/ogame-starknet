import { useReducer, useContext, createContext } from 'react';
import { namedConsoleLog } from '../../lib/helpers';

const AppStateContext = createContext();
const AppDispatchContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case 'set_profileID':
            namedConsoleLog('state', state);
            namedConsoleLog('action.payload', action.payload);
            return null; //TODO
        default:
            throw new Error(`Unknown action: ${action.type}`)
    }
}

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <AppDispatchContext.Provider value={dispatch}>
            <AppStateContext.Provider value={state}>
                {children}
            </AppStateContext.Provider>
        </AppDispatchContext.Provider>
    )
}

export const useAppContext = () => useContext(AppStateContext);
export const useDispatchContext = () => useContext(AppDispatchContext);
