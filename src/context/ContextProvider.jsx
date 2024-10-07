import { createContext, useContext, useState } from "react";

const StateContext = createContext();
const initialState = {
  chat: false,
  cart: false,
  UserProfile: false,
  Notification: false
}


export const ContextProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState)
  const handleClick = (clicked) => {
    setIsClicked({ ...initialState, [clicked]: true })
  }
  const [screenSize, setScreenSize] = useState(undefined)

  return (
    <StateContext.Provider value={{
      activeMenu, setActiveMenu,
      isClicked,
      setIsClicked,
      handleClick,
      screenSize,
      setScreenSize
    }}>
      {children}
    </StateContext.Provider>
  );
};

// Corrected the return of useContext for better usage in other components
export const useStateContext = () => useContext(StateContext);


