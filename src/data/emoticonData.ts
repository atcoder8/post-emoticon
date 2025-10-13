import emoticonData from "../assets/emoticon-data.json";

/** 登録されている顔文字のリストを返します。 */
export function getEmoticonList(): string[] {
  return emoticonData["emoticon-list"];
}
