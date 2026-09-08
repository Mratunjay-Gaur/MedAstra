// MedAstra — Case Context (Phase 1 Placeholder)
import { createContext, useContext, useState } from 'react';

const CaseContext = createContext(null);

export const CaseProvider = ({ children }) => {
  const [currentCase, setCurrentCase] = useState(null);

  return (
    <CaseContext.Provider value={{ currentCase, setCurrentCase }}>
      {children}
    </CaseContext.Provider>
  );
};

export const useCase = () => useContext(CaseContext);
