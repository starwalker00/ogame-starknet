import { useReducer, useContext, createContext, Dispatch } from 'react';
import { namedConsoleLog } from 'src/lib/helper';

enum AppContextActionKind {
    setContextAccount = 'set_contextAccount'
};

interface AppContext {
    contextAccount: string;
};

interface AppContextAction {
    type: AppContextActionKind;
    payload: string;
};

let appContext = {
    contextAccount: undefined
};

const AppStateContext = createContext<AppContext>({} as AppContext);
const AppDispatchContext = createContext<Dispatch<any>>({} as Dispatch<any>);

const reducer = (state: AppContext, action: AppContextAction) => {
    switch (action.type) {
        case 'set_contextAccount':
            // namedConsoleLog('state', state);
            // namedConsoleLog('action.payload', action.payload);
            return { ...state, contextAccount: action.payload }
        default:
            throw new Error(`Unknown action: ${action.type}`)
    }
}

export const AppProvider = ({ children }: any) => {
    // @ts-ignore
    const [state, dispatch] = useReducer(reducer, appContext);
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
