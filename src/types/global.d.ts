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
interface Point {
  X: number;
  Y: number;
}

// *** Globally accessible, no need to import
declare global {
  export interface CircuitDetails {
    xy_values: Point[];
    rotation: number;
    corners: Point[];
  }

  type ViewType = 'drivers' | 'constructors';

  type DashParams = {
    year: string;
    event: string | undefined;
    session: string | undefined;
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
