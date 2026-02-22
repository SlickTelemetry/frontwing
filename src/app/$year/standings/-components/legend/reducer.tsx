import { GetStandingsQuery } from '@/types/graphql';

type VisibilityState = Record<string, boolean>;
type VisibilityAction = {
  type: 'TOGGLE_VISIBILITY';
  payload: {
    type: 'drivers' | 'constructors' | 'all' | 'none';
    ids?: string[];
    data: {
      memoizedDrivers: GetStandingsQuery['drivers'];
      memoizedConstructors: GetStandingsQuery['constructors'];
      driverLookupMap: Record<string, GetStandingsQuery['drivers'][number]>;
      constructorDriversMap: Map<string, string[]>;
    };
  };
};

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
    return {};
  }

  let itemsToToggle = ids;
  if (type === 'none') {
    itemsToToggle = [
      ...Object.keys(driverLookupMap),
      ...data.memoizedConstructors.map((c) => c.name ?? ''),
    ];
  }

  itemsToToggle?.forEach((id) => {
    if (type === 'none') {
      newState[id] = true;
      return;
    }

    const constructor =
      driverLookupMap[id]?.latest_constructor[0].constructor?.name ?? id;
    const constructorDriverAbbrs = constructorDriversMap.get(constructor) ?? [];

    newState[id] = !state[id];

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
