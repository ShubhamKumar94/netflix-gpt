import { createSlice } from "@reduxjs/toolkit";

const confgSlice = createSlice({
    name : "config",
    initialState : {
        lang : "en"
    },
    reducers:{
        changeLanguage : (state,action)=>{
            state.lang = action.payload;
        }
    }
});

export const {changeLanguage} = confgSlice.actions;

export default confgSlice.reducer;