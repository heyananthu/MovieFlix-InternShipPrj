import { useContext, createContext, useState } from "react";

export const userContext = createContext()
export const UserProvider = ({ children }) => {

    const [userState, setuserState] = useState({})
    return (
        <userContext.Provider value={{ userState, setuserState }}>
            {children}
        </userContext.Provider>
    )

}