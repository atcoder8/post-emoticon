<script setup lang="ts">
import { ref } from "vue";
import emoticonData from "../assets/emoticon-data.json";
import EmoticonSelector from "../components/EmoticonSelector.vue";
import type { EmoticonOption } from "../types";
import urlJoin from "proper-url-join";

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

/** 顔文字を𝕏に投稿します。 */
function postEmoticon() {
  if (selectedOption.value === undefined) {
    return;
  }

  const postLink = urlJoin("https://twitter.com/intent/tweet", {
    query: {
      text: selectedOption.value.emoticon,
    },
  });

  window.open(postLink, "_blank");
}
</script>

<template>
  <div class="flex flex-col m-2 gap-y-2">
    <EmoticonSelector :options="emoticonOptions" v-model="selectedOption" />

    <div>
      <button
        @click="postEmoticon"
        :disabled="selectedOption === undefined"
        class="px-2 py-1 border rounded-lg"
        :class="
          selectedOption !== undefined ? 'cursor-pointer' : 'text-gray-300'
        "
      >
        𝕏に投稿
      </button>
    </div>
  </div>
</template>
