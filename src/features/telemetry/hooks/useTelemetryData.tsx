import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';

import { GetTelemetryQuery } from '@/types/graphql';

export interface TelemetryItemContextValue {
  season: string;
  event: string;
  driver: string;
  color: string;
  session: string;
  lap: string;
  telemetry: GetTelemetryQuery['telemetry'];
}

export interface TelemetryContextType {
  telemetries: TelemetryItemContextValue[];
  setTelemetries: Dispatch<SetStateAction<TelemetryItemContextValue[]>>;
}

const TelemetryDataContext = createContext<TelemetryContextType | undefined>(
  undefined,
);

export function useTelemetryData() {
  const ctx = useContext(TelemetryDataContext);
  if (!ctx) {
    throw new Error(
      'useTelemetryData must be used within TelemetryDataProvider',
    );
  }
  return ctx;
}

export function TelemetryDataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [telemetries, setTelemetries] = useState<TelemetryItemContextValue[]>(
    [],
  );

  return (
    <TelemetryDataContext.Provider value={{ telemetries, setTelemetries }}>
      {children}
    </TelemetryDataContext.Provider>
  );
}
