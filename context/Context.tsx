import React, { useState } from 'react';

interface AppState {
    theme: "light" | "dark";
}

interface AppContextProps {
    state: AppState;
    // Define your getter and setter functions here
    setTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>;
    // Add more getter and setter functions as needed
}

const AppContext = React.createContext<AppContextProps | undefined>(undefined);

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, setState] = useState<AppState>({
        theme: "light",
        // Initialize other state properties here
    });

    // Define getter and setter functions
    const setTheme: React.Dispatch<React.SetStateAction<"light" | "dark">> = (value) => {
        setState((prevState) => {
            // Handle both functional and direct state updates
            const updatedValue = typeof value === 'function' ? value(prevState.theme) : value;
            return { ...prevState, theme: updatedValue };
        });
    };

    // Add more getter and setter functions as needed

    return (
        <AppContext.Provider value={{ state, setTheme }}>
            {children}
        </AppContext.Provider>
    );
};

const useAppState = () => {
    const context = React.useContext(AppContext);
    if (!context) {
        throw new Error('useAppState must be used within an AppProvider');
    }
    return context;
};

export { AppProvider, useAppState };
