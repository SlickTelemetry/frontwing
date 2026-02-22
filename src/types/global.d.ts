import {
  EventCompetitionResultsFragment,
  EventPracticeResultsFragment,
  EventQualifyingResultsFragment,
  GetEventScheduleQuery,
} from './graphql';

// *** Require Import
export type SeasonEvent = null | GetEventScheduleQuery['schedule'][number];

export type EventSessionResults =
  | EventCompetitionResultsFragment['driver_sessions'][number]
  | EventQualifyingResultsFragment['driver_sessions'][number]
  | EventPracticeResultsFragment['driver_sessions'][number];

// *** Helper
interface XY {
  X: number;
  Y: number;
}

// *** Globally accessible, no need to import
declare global {
  export interface CircuitDetails {
    xy_values: XY[];
    rotation: number;
  }

  type ViewType = 'drivers' | 'constructors';

  type DashParams = {
    year?: string | number;
    event?: string | number;
    session?: string | number;
  };
  type SessionKey =
    | 'session1'
    | 'session2'
    | 'session3'
    | 'session4'
    | 'session5';

  type FinishingClassificationCode = 'R' | 'D' | 'E' | 'W' | 'F' | 'N';

  type AvailablePointsConfig = {
    drivers: {
      sprint: number;
      normal: number;
    };
    constructors: {
      sprint: number;
      normal: number;
    };
  };
}
