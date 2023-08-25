<script lang="ts" setup>
import { reactive } from "vue";
import draggable from "vuedraggable";

const list: any[] = reactive([]);
</script>

<template>
  <draggable class="dragArea list-group" :list="list" group="components" item-key="name" @change="(e) => console.log(e)">
    <template #item="{ element }">
      <div class="list-group-item">
        <component :is="element.component" />
      </div>
    </template>
  </draggable>
</template>

<style lang="less" scoped>
.dragArea {
  height: 100%;
}
</style>