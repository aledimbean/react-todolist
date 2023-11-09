import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Quotes } from "../models/Quotes";

export const fetchQuotes = createAsyncThunk("fetchTodos", async () => {
  const res = await fetch(`https://type.fit/api/quotes`);
  const json = await res.json();
  console.log(json);
  return json;
});

export const quotesSlice = createSlice({
  name: 'quotes',
  initialState: [] as Quotes[],
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchQuotes.fulfilled, (state, action) => {
        return action.payload;
    })
   }
});
export default quotesSlice.reducer;
