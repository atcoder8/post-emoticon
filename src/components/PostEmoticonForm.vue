<script setup lang="ts">
import usePostOption from "../composables/usePostOption";
import BasicButton from "./BasicButton.vue";
import EmoticonSelector from "./EmoticonSelector.vue";

const {
  emoticonOptions,
  selectedOption,
  postOption,
  platformOptions,
  copyToClipboard,
  postEmoticon,
} = usePostOption();
</script>

<template>
  <div class="flex flex-col gap-y-2">
    <EmoticonSelector :options="emoticonOptions" v-model="selectedOption" />

    <div class="flex gap-x-1">
      <input
        id="include-hashtag-post-emoticon-checkbox"
        type="checkbox"
        v-model="postOption.hashtag.postEmoticon"
      />
      <label for="include-hashtag-post-emoticon-checkbox"
        >ハッシュタグ「#PostEmoticon」を含める</label
      >
    </div>

    <div class="flex gap-x-1">
      <input
        id="include-hashtag-emoticon-of-the-day-checkbox"
        type="checkbox"
        v-model="postOption.hashtag.emoticonOfTheDay"
      />
      <label for="include-hashtag-emoticon-of-the-day-checkbox"
        >ハッシュタグ「#今日の顔文字」を含める</label
      >
    </div>

    <div class="flex gap-x-1">
      <input
        id="include-link-checkbox"
        type="checkbox"
        v-model="postOption.link.thisPage"
      />
      <label for="include-link-checkbox">このページのリンクを含める</label>
    </div>

    <div class="flex flex-col gap-y-2">
      <div class="flex flex-wrap gap-x-2">
        <BasicButton
          v-for="option in platformOptions"
          :key="option.platform"
          :label="`${option.label}に投稿`"
          :enabled="selectedOption !== undefined"
          @click="postEmoticon(option.platform)"
        />
      </div>

      <BasicButton
        label="クリップボードにコピー"
        :enabled="selectedOption !== undefined"
        @click="copyToClipboard"
      />
    </div>
  </div>
</template>
