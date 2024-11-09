import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        ip:'',
    },
    reducers: {
        setIp(state, action) {
            state.ip = action.payload;
        },
        resetIp(state) {
            state.ip = '';
        }
    },
});

export const {setIp,resetIp} = authSlice.actions;
export default authSlice.reducer;