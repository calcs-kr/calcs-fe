import React, { useReducer, useContext, createContext, Dispatch } from 'react';

type Data = {
    status: number,
    result: [] //Map<string, any[]>
}

// API 상태 타입 정의
type State = {
    searchLoading: boolean,
    search: Data | null,
    searchError: object | null | boolean
};

// API 동작 타입 정의
type Action =
    | { type: 'LOADING'; }
    | { type: 'SEARCH'; search: Data; }
    | { type: 'ERROR'; searchError: any }

// Action Dispatch를 Generics로 설정 
type ActionDispatch = Dispatch<Action>;

// Context 만들기
const StateContext = createContext<State | null>(null);
const DispatchContext = createContext<ActionDispatch | null>(null);


// 리듀서
function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'LOADING':
            return {
                searchLoading: true,
                search: null,
                searchError: null
            };
        case 'SEARCH':
            return {
                searchLoading: false,
                search: action.search,
                searchError: null
            };
        case 'ERROR':
            return {
                searchLoading: false,
                search: null,
                searchError: action.searchError
            };
    }
}

export function SearchProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(reducer, { 
        searchLoading: false,                 
        search: null,
        searchError: false 
    })

    return (
        <StateContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
                {children}
            </DispatchContext.Provider>
        </StateContext.Provider>
    )
}

// State & Dispatch Custom Hooks
export function useAPISearchState() {
    const state = useContext(StateContext)
    if (!state) throw new Error('Error: Cannot find SampleProvider')
    return state;
}

export function useAPISearchDispatch() {
    const dispatch = useContext(DispatchContext)
    if (!dispatch) throw new Error('Cannot find SampleProvider')
    return dispatch
}