export default function Reducer(state, action) {
    switch (action.type) {
        case 'NEW_SEARCH':
            return action.payload;
        case 'RESET_SEARCH':
            return {
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
        default:
            return state;
    }
}
