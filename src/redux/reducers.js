export default (state = [], action) => {
    const { type } = action;
    switch (type) {
        case 'ADD':
            return [...state, {
                id: String(Date.now()),
                text: action.payload
            }];
        case 'REMOVE':
            return state.filter(item => {
                return item.id !== action.payload
            });
        case 'SET':
            return action.payload;
        default:
            return state;
    }
}