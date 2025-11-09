<script setup lang="ts">
import { computed, ref } from "vue";
import emoticonData from "../assets/emoticon-data.json";
import EmoticonSelector from "../components/EmoticonSelector.vue";
import type { EmoticonOption, Platform } from "../types";
import urlJoin from "proper-url-join";
import BasicButton from "./BasicButton.vue";

const emoticonList = emoticonData["emoticon-list"];

/** 顔文字の選択肢 */
const emoticonOptions: EmoticonOption[] = emoticonList.map(
  (emoticon, index) => ({
    id: index,
    emoticon,
  })
);

/** 選択された顔文字 */
const selectedOption = ref<EmoticonOption | undefined>(emoticonOptions[0]);

/** 投稿にハッシュタグ「#今日の顔文字」を含めるかどうかを表すフラグ */
const includeHashtag = ref<boolean>(false);

/** 投稿にリンクを含めるかどうかを表すフラグ */
const includeLink = ref<boolean>(false);

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

/** 投稿内容の文字列 */
const postText = computed(() => {
  if (selectedOption.value === undefined) {
    return undefined;
  }

  const hashtag = includeHashtag.value ? "\n#今日の顔文字" : "";
  const link = includeLink.value ? `\n${location.href}` : "";
  return `${selectedOption.value.emoticon}${hashtag}${link}`;
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

/** 投稿内容をクリップボードにコピーします。 */
function copyToClipboard() {
  if (postText.value === undefined) {
    return;
  }

  navigator.clipboard.writeText(postText.value);
}
</script>

<template>
  <div class="flex flex-col gap-y-2">
    <EmoticonSelector :options="emoticonOptions" v-model="selectedOption" />

    <div class="flex gap-x-1">
      <input
        id="include-hashtag-checkbox"
        type="checkbox"
        v-model="includeHashtag"
      />
      <label for="include-hashtag-checkbox"
        >ハッシュタグ「#今日の顔文字」を含める</label
      >
    </div>

    <div class="flex gap-x-1">
      <input id="include-link-checkbox" type="checkbox" v-model="includeLink" />
      <label for="include-link-checkbox">このページのリンクを含める</label>
    </div>

    <div class="flex gap-x-2">
      <BasicButton
        label="クリップボードにコピー"
        :enabled="selectedOption !== undefined"
        @click="copyToClipboard"
      />

      <BasicButton
        v-for="option in platformOptions"
        :key="option.platform"
        :label="`${option.label}に投稿`"
        :enabled="selectedOption !== undefined"
        @click="postEmoticon(option.platform)"
      />
    </div>
  </div>
</template>
