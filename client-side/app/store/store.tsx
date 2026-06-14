import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Timestamp } from 'next/dist/server/lib/cache-handlers/types';

interface user {
     _id: String,
     email: String,
     username: String,
     isGoogle: Boolean,
     theme: "light" | "dark",
     login: Boolean,
     weatherCity: String,
     conversation: conversationType[],
     message: messageType[],
     aiConversation: aiConversationType[],
     aiMessage: messageType[],
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
     searchUser: searchUserType[],
     selectedChatId: string,
     total_ai_message: number,
     total_message: number,
     weather: string,
     matchCode: string,
     color: string,
     rating: number
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

type aiConversationType = {
     _id: string,
     user: string,
     title: string,
     createdAt: Timestamp,
     updatedAt: Timestamp
}

const initialState: State = {
     value: {
          _id: "",
          email: "",
          weatherCity: "",
          username: "",
          isGoogle: false,
          theme: 'light',
          login: true,
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
          searchUser: [],
          aiConversation: [],
          aiMessage: [],
          selectedChatId: "",
          total_message: 0,
          total_ai_message: 0,
          weather: "31°C",
          matchCode: "",
          color: "",
          rating: 200
     }
}

const slice = createSlice({
     name: "user",
     initialState,
     reducers: {
          initUser: (state, action: PayloadAction<user>) => {
               state.value = action.payload;
          },
          updateUser: (state, action: PayloadAction<Partial<user>>) => {
               Object.assign(state.value, action.payload);
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
          addConversation: (state, action: PayloadAction<conversationType>) => {
               state.value.conversation.push(action.payload)
          },
          initMessage: (state, action: PayloadAction<messageType[]>) => {
               state.value.message = action.payload;
          },
          addMessage: (state, action: PayloadAction<messageType>) => {
               state.value.message.push(action.payload);
               // adding last message logic
               const conversationId = action.payload.chat_id
               const data = state.value.conversation.map((item) => {
                    if (item._id.toString() === conversationId.toString()) {
                         return {
                              ...item,
                              last_message: action.payload.message
                         }
                    }
                    return item
               });
               state.value.conversation = data
          },
          clearMessage: (state) => {
               state.value.message = [];
          },
          addSearchUser: (state, action: PayloadAction<searchUserType[]>) => {
               state.value.searchUser = action.payload;
          },
          clearSearchUser: (state) => {
               state.value.searchUser = []
          },
          initAIConversation: (state, action: PayloadAction<aiConversationType[]>) => {
               state.value.aiConversation = action.payload
          },
          addAIConversation: (state, action: PayloadAction<aiConversationType>) => {
               state.value.aiConversation.push(action.payload);
          },
          initAIMessage: (state, action: PayloadAction<messageType[]>) => {
               state.value.aiMessage = action.payload
          },
          addAIMessage: (state, action: PayloadAction<messageType>) => {
               console.log(action.payload);
               if (action.payload) {
                    console.log(action);
                    state.value.aiMessage.push(action.payload);
               }
          },
          addSelectedChatId: (state, action: PayloadAction<string>) => {
               state.value.selectedChatId = action.payload;
          },
          clearSelectedChatId: (state) => {
               state.value.selectedChatId = ""
          },
          initWeather: (state, action: PayloadAction<string>) => {
               state.value.weather = action.payload
          },
          setMatchcode: (state, action: PayloadAction<string>) => {
               state.value.matchCode = action.payload
          },
          setColor: (state, action: PayloadAction<string>) => {
               state.value.color = action.payload
          },
          addChessWin: (state) => {
               state.value.chess_win = state.value.chess_win + 1
          },
          addChessDraw: (state) => {
               state.value.chess_draw = state.value.chess_draw + 1
          },
          addChessTotal: (state) => {
               state.value.chess_total = state.value.chess_total + 1
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
     clearMessage, addSearchUser, clearSearchUser, addConversation, initAIConversation,
     addAIConversation, initAIMessage, addAIMessage, addSelectedChatId, clearSelectedChatId,
     updateUser, initWeather, setMatchcode, setColor, addChessWin, addChessDraw,
     addChessTotal } = slice.actions;