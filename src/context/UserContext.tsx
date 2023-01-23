import React, { useReducer, useContext, createContext, Dispatch } from 'react';

// API 상태 타입 정의
type State = {
    loading: boolean,
    token: String | null,
    error: object | null | boolean
};

// API 동작 타입 정의
type Action =
    | { type: 'LOGIN'; }
    | { type: 'SUCCESS'; token: string; }
    | { type: 'LOGOUT'; }
    | { type: 'EXPIRY'; }

// Action Dispatch를 Generics로 설정 
type ActionDispatch = Dispatch<Action>;

// Context 만들기
const StateContext = createContext<State | null>(null);
const DispatchContext = createContext<ActionDispatch | null>(null);


// 리듀서
function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'LOGIN':
            return {
                loading: true,
                token: null,
                error: null
            }
        case 'SUCCESS':
            return {
                loading: false,
                token: action.token,
                error: null
            }
        case 'LOGOUT':
            return {
                loading: false,
                token: null,
                error: null
            }
        case 'EXPIRY':
            return {
                loading: false,
                token: null,
                error: null
            }
    }
}

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(reducer, { 
        loading: true,                 
        token: null,
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
export function useUserState() {
    const state = useContext(StateContext)
    if (!state) throw new Error('Error: Cannot find SampleProvider')
    return state;
}

export function useUserDispatch() {
    const dispatch = useContext(DispatchContext)
    if (!dispatch) throw new Error('Cannot find SampleProvider')
    return dispatch
}