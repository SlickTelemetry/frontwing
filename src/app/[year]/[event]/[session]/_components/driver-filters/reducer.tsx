import { VariablesOf } from '@graphql-typed-document-node/core';

import { EventCompetitionResultsFragment } from '@/components/results/results-tables/competition';

import { GetSessionDetailsQuery } from '@/types/graphql';

// 1. Define the State and Action Types
type VisibilityState = Record<string, boolean>; // Still needed internally
type VisibilityAction = {
  type: 'TOGGLE_VISIBILITY';
  payload: {
    type: 'drivers' | 'constructors' | 'all' | 'none';
    ids?: string[];
    // Pass the memoized data needed for logic, ensuring stability
    data: {
      memoizedDrivers: VariablesOf<typeof EventCompetitionResultsFragment>;
      memoizedConstructors: { name: string; color: string }[];
      driverLookupMap: Record<
        string,
        GetSessionDetailsQuery['sessions'][number]['driver_sessions'][number]
      >;
      constructorDriversMap: Map<string, string[]>;
    };
  };
};

// 2. The Reducer Function
export function visibilityReducer(
  state: VisibilityState,
  action: VisibilityAction,
): VisibilityState {
  if (action.type !== 'TOGGLE_VISIBILITY') {
    return state;
  }

  const { type, ids, data } = action.payload;
  const { driverLookupMap, constructorDriversMap } = data;
  const newState = { ...state };

  if (type === 'all') {
    return {}; // Show all
  }

  let itemsToToggle = ids;
  if (type === 'none') {
    // Generate all IDs if 'none' is requested
    itemsToToggle = [
      ...Object.keys(driverLookupMap),
      ...data.memoizedConstructors.map((c) => c.name ?? ''), // Assuming constructors are in memoizedConstructors
    ];
  }

  itemsToToggle?.forEach((id) => {
    // Logic remains the same, but uses the `state` (prev) from the reducer
    if (type === 'none') {
      newState[id] = true;
      return;
    }

    // O(1) Lookups using the passed data maps
    const constructor =
      driverLookupMap[id]?.constructorByConstructorId?.name ?? id;
    const constructorDriverAbbrs = constructorDriversMap.get(constructor) ?? [];

    // Update given item
    newState[id] = !state[id]; // Use the current state for toggling

    if (type === 'constructors') {
      constructorDriverAbbrs.forEach(
        (dAbbr) => (newState[dAbbr] = newState[id]),
      );
    }
    if (type === 'drivers') {
      const allHidden = constructorDriverAbbrs.every(
        (dAbbr) => newState[dAbbr],
      );
      newState[constructor] = allHidden;
    }
  });

  return newState;
}
