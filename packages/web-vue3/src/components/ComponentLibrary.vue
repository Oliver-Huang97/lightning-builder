<script lang="tsx" setup>
import { createElementVNode } from "vue";
import draggable from "vuedraggable";

const list = [
  {
    name: 'button',
    component: 'a-button',
  },
  {
    name: 'input',
    component: 'a-input'
  },
];

const clone = (item: any) => {
  return {
    name: createElementVNode(item.component),
    component: item.component,
  };
};

const onStart = (e: any) => {
  e.clone = createElementVNode(list[e.oldIndex].component)
}
</script>

<template>
  <draggable class="dragArea list-group" :list="list" :group="{ name: 'components', pull: 'clone', put: false }"
    :clone="clone" item-key="name" @start="onStart" :sort="false">
    <template #item="{ element }">
      <div class="list-group-item">
        {{ element.name }}
      </div>
    </template>
  </draggable>
</template>

<style lang="less" scoped>
.component-library {
  >div {
    height: 20px;

    &:hover {
      background: rgba(22, 22, 22, .3);
    }
  }
}
</style>