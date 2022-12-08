import { Characters } from '../types/Characters';

type RemoveCharactersAction = { type: 'currentCharacters/REMOVE' };

type SetCharactersAction = {
  type: 'currentCharacters/SET';
  payload: Characters;
};

const removeCharacter = (): RemoveCharactersAction => ({ type: 'currentCharacters/REMOVE' });

const setCharacter = (Character: Characters): SetCharactersAction => ({
  type: 'currentCharacters/SET',
  payload: Character,
});

export const actions = { setCharacter, removeCharacter };

type State = Characters | null;
type Action = SetCharactersAction | RemoveCharactersAction;

const currentCharacterReducer = (
  state: State = null,
  action: Action,
): State => {
  switch (action.type) {
  case 'currentCharacters/SET':
    return action.payload;

  case 'currentCharacters/REMOVE':
    return null;

  default:
    return state;
  }
};

export default currentCharacterReducer;