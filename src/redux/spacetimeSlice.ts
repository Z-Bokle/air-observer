import { createSlice } from "@reduxjs/toolkit"

const spacetimeSlice = createSlice({
    name: 'spacetime',
    initialState: {
        pollutionOptions: [
            {name: 'PM2.5', option: false},
            {name: 'PM10', option: false},
            {name: 'NO2', option: false},
            {name: 'O3', option: false},
            {name: 'WIND', option: false},
            {name: 'TEMP', option: false},
            {name: 'RH', option: false},
            {name: 'PSFC', option: false}
        ],
        year: 1356998400000 // new Date('2013-01').valueOf()
    },
    reducers: {
        setPollutionOptions(state, {payload}) {
            state.pollutionOptions = payload
        }
    }
})

export default spacetimeSlice