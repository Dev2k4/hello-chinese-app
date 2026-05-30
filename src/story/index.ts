export {
  CHARACTERS,
  PLAYER_CHARACTER,
  getAvatarStyle,
  getCharacterForRealm,
} from "./characters";
export type {
  Character, CharacterId, CharacterRole, CharacterGender,
  CharacterEmotion, AvatarStyle, PlayerInfo, RealmGuardianInfo,
} from "./characters";

export { REALMS, getRealmForHsk, getRealmByXp, getTierProgress } from "./realms";
export type { Realm, RealmTier } from "./realms";

export { PROLOGUE, LEVEL_UP_DIALOGUES, RIVAL_TAUNTS, getTierClearDialogue } from "./dialogue";
export type { DialogueLine, PrologueScene } from "./dialogue";
