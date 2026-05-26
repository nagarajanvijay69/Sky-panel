import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface user {
     _id: String,
     email: String,
     username: String,
     theme: "light" | "dark",
     login: Boolean,
     weatherCity: String,
     conversation: conversationType[],
     message: messageType[],
     last_seen: string,
     isOnline: boolean,
     profilePic: string,
     font_family: string,
     chess_total: number,
     chess_win: number,
     chess_draw: number,
     tic_total: number,
     tic_win: number,
     tic_draw: number,
     chatbot_message: number,
     searchUser: searchUserType[]
}

interface State {
     value: user
}

type searchUserType = {
     _id: string,
     username: string,
     email: string,
     profilePic: string
}

export type messageType = {
     _id: string,
     chat_id: string,
     sender_id: string,
     message: string,
     createdAt: string,
     updatedAt: string
}

export type conversationType = {
     _id: string,
     participants: [string, string],
     createdAt: Date,
     updatedAt: Date,
     unread_message: number,
     last_message: string,
     username: string,
     receiver_id: string
}

const initialState: State = {
     value: {
          _id: "",
          email: "",
          weatherCity: "",
          username: "",
          theme: 'light',
          login: false,
          conversation: [],
          message: [],
          last_seen: new Date().toString(),
          isOnline: false,
          profilePic: "",
          font_family: "",
          chess_total: 0,
          chess_win: 0,
          chess_draw: 0,
          tic_total: 0,
          tic_win: 0,
          tic_draw: 0,
          chatbot_message: 0,
          searchUser: []
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
          },
          setConversation: (state, action: PayloadAction<conversationType[]>) => {
               state.value.conversation = action.payload;
          },
          addConversation: (state, action: PayloadAction<conversationType>) =>{
               state.value.conversation.push(action.payload)
          },
          initMessage: (state, action: PayloadAction<messageType[]>) => {
               state.value.message = action.payload;
          },
          addMessage: (state, action: PayloadAction<messageType>) => {
               state.value.message.push(action.payload);
          },
          clearMessage: (state) => {
               state.value.message = [];
          },
          addSearchUser: (state, action: PayloadAction<searchUserType[]>) => {
               state.value.searchUser = action.payload;
          },
          clearSearchUser: (state) => {
               state.value.searchUser = []
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
export const { initUser, setTheme, setLogIn, setConversation, initMessage, addMessage,
     clearMessage, addSearchUser, clearSearchUser, addConversation } = slice.actions;