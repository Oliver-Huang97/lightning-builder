import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useRootStore = defineStore('root', () => {
  const dragEnable = ref(false);

  const startDrag = () => {
    dragEnable.value = true;
  };

  const cancelDrag = () => {
    dragEnable.value = false;
  };

  return { dragEnable, startDrag, cancelDrag };
});
