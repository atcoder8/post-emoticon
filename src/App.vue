<script setup lang="ts">
import PostEmoticonForm from "./components/PostEmoticonForm.vue";

const repositoryLink = "https://github.com/atcoder8/post-emoticon";
</script>

<template>
  <div class="flex flex-col m-2 text-xl gap-y-4">
    <PostEmoticonForm />

    <div>
      ソースコードは<a :href="repositoryLink" class="text-blue-600">こちら</a>
    </div>
  </div>
</template>
