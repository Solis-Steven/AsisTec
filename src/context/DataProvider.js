
import { useState, useEffect, createContext } from "react";

const DataContext = createContext();

const DataProvider = ({ children }) => {

    const [eventItems, setEventItems] = useState({});

    

    return (

        <DataContext.Provider value={{eventItems,setEventItems}}>
            {children}
        </DataContext.Provider>


    );

};

export { DataProvider };
export default DataContext;