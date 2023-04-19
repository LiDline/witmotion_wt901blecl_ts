import React from "react";
import { Application } from "../functions/Application";

const ReactContext = React.createContext(
  undefined as ApplicationContext | undefined
); // Объявляем контекст типа  ApplicationContext

export interface ApplicationContext {
  application: Application;
}

export interface ApplicationProviderProps {
  children: React.ReactNode; // Сюда кладём/ложим всё что угодно
  application: Application;
}

export function ApplicationProvider({
  children,
  application,
}: ApplicationProviderProps) {
  const context: ApplicationContext = { application };

  return (
    <ReactContext.Provider value={context}>{children}</ReactContext.Provider>
  );
}

export function useApplicationContext(): ApplicationContext {
  // Абстракция/обёртка при вызове хуков (просто сокращает запись)
  return React.useContext(ReactContext) as ApplicationContext; // иначе пришлось бы писать это везде снизу
}

export function useApplication(): Application {
  // Хук, используем в children для доступа к контексту с логикой
  return useApplicationContext().application; // обращаемся к контексту и достаём только application - экземпляр класса Application -
  // какая-то логика на TS.
}
