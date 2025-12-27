// 1. Define the State and Action Types
type VisibilityState = Record<string, boolean>; // Still needed internally
type VisibilityAction =
  | {
      type: 'SET_HIDDEN';
      payload: {
        ids: (string | null | undefined)[];
        value: boolean;
      };
    }
  | { type: 'RESET' };

// 2. The Reducer Function
export function visibilityReducer(
  state: VisibilityState,
  action: VisibilityAction,
): VisibilityState {
  switch (action.type) {
    case 'RESET':
      return {};

    case 'SET_HIDDEN': {
      const { ids: setIds, value } = action.payload;
      const newState = { ...state };
      setIds.forEach((id) => {
        if (!id) return;
        newState[id] = value;
      });
      return newState;
    }

    default:
      return state;
  }
}
