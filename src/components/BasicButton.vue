<script setup lang="ts">
interface Props {
  /** ボタンのラベル */
  label: string;

  /** ボタンを有効化するかどうかを指定するフラグ */
  enabled: boolean;
}

defineProps<Props>();

defineEmits<{ click: [] }>();
</script>

<template>
  <button
    type="button"
    @click="$emit('click')"
    :disabled="!enabled"
    class="w-fit h-fit px-2 py-1 border rounded-lg"
    :class="
      enabled
        ? 'cursor-pointer hover:bg-blue-100 active:bg-blue-300'
        : 'text-gray-300'
    "
  >
    {{ label }}
  </button>
</template>
