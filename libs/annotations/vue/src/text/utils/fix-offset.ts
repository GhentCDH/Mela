import type { Snapper } from '../../snapper';

type ACTIONS = 'updateCreating' | 'confirmStartUpdating' | 'confirmUpdate';

type State<ACTION> = {
  newStart: number;
  newEnd: number;

  [key: string]: any;
};

export const fixOffset = <ACTION extends ACTIONS, STATE extends State<ACTION>>(
  updateState: STATE,
  snapper: Snapper,
  action: ACTION,
) => {
  if (!updateState) return;

  if (!snapper) {
    updateState?.[action]();
    return;
  }
  const result = snapper.fixOffset(updateState.newStart, updateState.newEnd);
  updateState.newStart = result.start;
  updateState.newEnd = result.end;

  updateState[action]();
};
