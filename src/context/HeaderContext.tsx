import React, { useReducer, useContext, createContext, Dispatch } from 'react';

// API 상태 타입 정의
type State = {
    scrollPosition: number,
};

// API 동작 타입 정의
type Action =
    | { type: 'UPDATE'; scrollPosition: number }

// Action Dispatch를 Generics로 설정 
type ActionDispatch = Dispatch<Action>;

// Context 만들기
const StateContext = createContext<State | null>(null);
const DispatchContext = createContext<ActionDispatch | null>(null);


// 리듀서
function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'UPDATE':
            return {
                scrollPosition: action.scrollPosition,
            };
    }
}

export function HeaderProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(reducer, { 
        scrollPosition: 0,
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
export function useHeaderState() {
    const state = useContext(StateContext)
    if (!state) throw new Error('Error: Cannot find SampleProvider')
    return state;
}

export function useHeaderDispatch() {
    const dispatch = useContext(DispatchContext)
    if (!dispatch) throw new Error('Cannot find SampleProvider')
    return dispatch
}