import React, { useReducer, useContext, createContext, Dispatch } from 'react';

type Data = {
    status: number,
    result: [] //Map<string, any[]>
}

// API 상태 타입 정의
type State = {
    loading: boolean,
    service: Data | null,
    category: Data | null,
    snapshot: Data | null,
    status: Data | null,
    stack: Data | null,
    error: object | null | boolean
};

// API 동작 타입 정의
type Action =
    | { type: 'LOADING'; }
    | { type: 'SUCCESS'; service: Data; category: Data; snapshot: Data; status: Data; stack: Data; }
    | { type: 'ERROR'; error: any }
    | { type: 'ERROR s' };

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
                loading: true,
                service: null,
                category: null,
                snapshot: null,
                status: null,
                stack: null,
                error: null
            };
        case 'SUCCESS':
            return {
                loading: false,
                service: action.service,
                category: action.category,
                snapshot: action.snapshot,
                status: action.status,
                stack: action.stack,
                error: null
            };
        case 'ERROR':
            return {
                loading: false,
                service: null,
                category: null,
                snapshot: null,
                status: null,
                stack: null,
                error: action.error
            };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

// 
export function APIProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(reducer, { 
        loading: false,                 
        service: null,
        category: null,
        snapshot: null,
        status: null,
        stack: null,
        error: false 
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
export function useAPIState() {
    const state = useContext(StateContext)
    if (!state) throw new Error('Error: Cannot find SampleProvider')
    return state;
}

export function useAPIDispatch() {
    const dispatch = useContext(DispatchContext)
    if (!dispatch) throw new Error('Cannot find SampleProvider')
    return dispatch
}