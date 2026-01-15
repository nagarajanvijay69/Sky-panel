import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface user {
     _id: String,
     email: String,
     username: String,
     theme: "light" | "dark",
     login: Boolean,
}

interface State {
     value: user
}

const initialState: State = {
     value: {
          _id: "",
          email: "",
          username: "",
          theme: 'light',
          login: false
     }
}

const slice = createSlice({
     name: "user",
     initialState,
     reducers: {
          initUser: (state, action: PayloadAction<user>) => {
               state.value = action.payload;
          },
          setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
               state.value.theme = action.payload;
          },
          setLogIn: (state, action: PayloadAction<Boolean>) => {
               state.value.login = action.payload;
          }
     }
});

const store = configureStore({
     reducer: {
          user: slice.reducer
     }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
export const { initUser, setTheme, setLogIn } = slice.actions;