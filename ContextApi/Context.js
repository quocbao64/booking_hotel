/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useReducer } from 'react';
import Reducer from './Reducer';

const initial_state = {
    quantity: undefined,
    dates: [
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        },
    ],
    rate: undefined,
};

export const Context = React.createContext(initial_state);

export function ContextProvider({ children }) {
    const [state, dispatch] = useReducer(Reducer, initial_state);

    return (
        <Context.Provider
            value={{
                quantity: state.quantity,
                dates: state.dates,
                rate: state.rate,
                dispatch,
            }}
        >
            {children}
        </Context.Provider>
    );
}
