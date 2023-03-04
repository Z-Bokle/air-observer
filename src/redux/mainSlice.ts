import { createSlice } from "@reduxjs/toolkit"

const mainSlice = createSlice({
    name: 'main',
    initialState: {
        title: 'Air Observer'
    },
    reducers: {
        setTitle(state, {payload}) {
            state.title = payload
        }
    }
})

export default mainSlice