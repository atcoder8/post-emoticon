import { computed, ref } from "vue";
import type { EmoticonOption, Platform } from "../types";
import emoticonData from "../assets/emoticon-data.json";
import urlJoin from "proper-url-join";

const emoticonList = emoticonData["emoticon-list"];

/** 顔文字の選択肢 */
const emoticonOptions: EmoticonOption[] = emoticonList.map(
  (emoticon, index) => ({
    id: index,
    emoticon,
  })
);

/** プラットフォームに対応するエンドポイントを返します。 */
function getEndpoint(platform: Platform) {
  switch (platform) {
    case "x":
      return "https://twitter.com/intent/tweet";
    case "bluesky":
      return "https://bsky.app/intent/compose";

    default:
      throw Error("不明なプラットフォームです。");
  }
}

export default function () {
  /** 選択された顔文字 */
  const selectedOption = ref<EmoticonOption | undefined>(emoticonOptions[0]);

  /** 投稿オプション */
  const postOption = ref({
    /** 投稿に含めるハッシュタグ */
    hashtag: {
      /** ハッシュタグ「#PostEmoticon」を含めるかどうかを表すフラグ */
      postEmoticon: false,

      /** ハッシュタグ「#今日の顔文字」を含めるかどうかを表すフラグ */
      emoticonOfTheDay: false,
    },

    /** 投稿に含めるリンク */
    link: {
      /** このページへのリンクを含めるかどうかを表すフラグ */
      thisPage: false,
    },
  });

  const supportedHashTagIdList = ["postEmoticon", "emoticonOfTheDay"] as const;

  type SupportedHashTagId = (typeof supportedHashTagIdList)[number];

  const hashtagMap = {
    postEmoticon: "#PostEmoticon",
    emoticonOfTheDay: "#今日の顔文字",
  } as const satisfies Record<SupportedHashTagId, string>;

  const supportedLinkIdList = ["thisPage"] as const;

  type SupportedLinkId = (typeof supportedLinkIdList)[number];

  const linkMap = {
    thisPage: location.href,
  } as const satisfies Record<SupportedLinkId, string>;

  /** 投稿内容の文字列 */
  const postText = computed(() => {
    if (selectedOption.value === undefined) {
      return undefined;
    }

    const hashtagText = supportedHashTagIdList
      .filter((id) => postOption.value.hashtag[id])
      .map((id) => hashtagMap[id])
      .join(" ");

    const linkText = supportedLinkIdList
      .filter((id) => postOption.value.link[id])
      .map((id) => linkMap[id])
      .join(" ");

    return [selectedOption.value.emoticon, hashtagText, linkText]
      .filter((text) => text.length > 0)
      .join("\n");
  });

  /** 顔文字をSNSプラットフォームに投稿します。 */
  function postEmoticon(platform: Platform) {
    if (postText.value === undefined) {
      return;
    }

    const postLink = urlJoin(getEndpoint(platform), {
      query: {
        text: postText.value,
      },
    });

    window.open(postLink, "_blank");
  }

  /** 投稿内容をクリップボードにコピーします。 */
  function copyToClipboard() {
    if (postText.value === undefined) {
      return;
    }

    navigator.clipboard.writeText(postText.value);
  }

  /** 投稿先プラットフォームの選択肢 */
  interface PlatformOption {
    /** プラットフォーム */
    platform: Platform;

    /** プラットフォームの表示ラベル */
    label: string;
  }

  /** 投稿先プラットフォームの選択肢のリスト */
  const platformOptions = [
    { platform: "x", label: "𝕏" },
    { platform: "bluesky", label: "Bluesky" },
  ] as const satisfies PlatformOption[];

  return {
    emoticonOptions,
    selectedOption,
    postOption,
    platformOptions,
    postEmoticon,
    copyToClipboard,
  };
}
