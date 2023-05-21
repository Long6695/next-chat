import { createSlice } from "@reduxjs/toolkit";
import { InitialState } from "./auth.type";
import { authApi } from "./auth.service";

const initialState: InitialState = {
    accessToken: null
}

export const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addMatcher(
            authApi.endpoints.login.matchFulfilled,
            (state, {payload}) => {
                state.accessToken = payload.accessToken
            }
        )
    },
})

export const {} = auth.actions

export default auth