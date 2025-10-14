/** 顔文字の選択肢 */
export interface EmoticonOption {
  /** 顔文字のID */
  id: number;

  /** 顔文字を構成する文字列 */
  emoticon: string;
}

/** 顔文字の投稿をサポートしているプラットフォーム */
export const supportedPlatforms = ["x", "bluesky"] as const;

/** 投稿先のプラットフォーム */
export type Platform = (typeof supportedPlatforms)[number];
