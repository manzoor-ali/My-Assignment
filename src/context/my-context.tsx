import React, { createContext, useState, ReactNode } from "react";

interface MonthlySalaryContextType {
  monthlySalaryValue: number | null;
  setMyMonthlySalaryValue: (newValue: number | null) => void;
}

interface MyProviderProps {
  children: ReactNode;
}

export const MyContext = createContext<MonthlySalaryContextType>({
  monthlySalaryValue: null,
  setMyMonthlySalaryValue: () => {},
});

export const MyProvider: React.FC<MyProviderProps> = ({ children }) => {
  const [monthlySalaryValue, setmonthlySalaryValue] = useState<number | null>(
    null,
  );

  const setMyMonthlySalaryValue = (newValue: number | null) => {
    setmonthlySalaryValue(newValue);
  };

  const contextValue: MonthlySalaryContextType = {
    monthlySalaryValue,
    setMyMonthlySalaryValue,
  };

  return (
    <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
  );
};
