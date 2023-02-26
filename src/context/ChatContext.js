// importing methods/properties from react
import { createContext, useContext, useReducer } from "react";

// importing AuthContext
import { AuthContext } from "./AuthContext";

// Creating Chat Context
export const ChatContext = createContext();

// exporting the chatContextProvider
export const ChatContextProvider = ({ children }) => {
  // accessing currentUser state variable from AuthContent
  const { currentUser } = useContext(AuthContext);

  // initializing values
  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <>
      <ChatContext.Provider value={{ data: state, dispatch }}>
        {children}
      </ChatContext.Provider>
    </>
  );
};
