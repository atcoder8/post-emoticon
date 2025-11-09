<script setup lang="ts">
import type { EmoticonOption } from "../types";
import { generateRandomInteger } from "../utils/randomNumber";
import BasicButton from "./BasicButton.vue";

interface Props {
  /** 顔文字の選択肢 */
  options: EmoticonOption[];
}

const props = defineProps<Props>();

/** 選択された選択肢 */
const selectedOption = defineModel<EmoticonOption | undefined>({
  required: true,
});

/** 顔文字をランダムに選択します。 */
function selectRandomEmoticon() {
  const emoticonId = generateRandomInteger(0, props.options.length);
  selectedOption.value = props.options[emoticonId];
}
</script>

<template>
  <div class="flex gap-x-2 items-center">
    <!-- 顔文字のセレクトボックス -->
    <select
      v-model="selectedOption"
      class="border px-2 py-1 rounded-lg cursor-pointer min-h-[42px]"
    >
      <option :key="option.id" :value="option" v-for="option in options">
        {{ option.emoticon }}
      </option>
    </select>

    <!-- ランダム選択ボタン -->
    <BasicButton
      label="ランダム"
      :enabled="true"
      @click="selectRandomEmoticon"
    />
  </div>
</template>
