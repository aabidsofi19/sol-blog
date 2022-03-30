<template>
  <Listbox>
    <div class="mt-1">
      <ListboxButton class="relative">
        <div>
          <slot name="label"> menu </slot>
        </div>
      </ListboxButton>

      <transition
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="w-fit py-1 mt-1 absolute z-10 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <slot />
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<script lang="ts">
import { ref } from "vue";
import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";

// import { CheckIcon, SelectorIcon } from '@heroicons/vue/solid'

export { default as BaseDropdownOption } from "./BaseDropdownOption.vue";

export const BaseDropdownSelect = {
  components: {
    Listbox,
    ListboxLabel,
    ListboxButton,
    ListboxOptions,
    ListboxOption,

    // CheckIcon,
    // SelectorIcon,
  },
  props: {
    label: {
      type: String,
      default: "",
    },
  },
};

export default BaseDropdownSelect;
</script>
