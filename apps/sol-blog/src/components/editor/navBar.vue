<script lang="ts" setup>
import { ref, computed } from "vue";
import useEditor from "@/src/composables/useEditor";
import BaseButton from "ui/BaseButton.vue";
import {
  WalletMultiButton,
  WalletModalProvider,
} from "@solana/wallet-adapter-vue-ui";
import { useWallet } from "@solana/wallet-adapter-vue";
import { useWorkspace } from "@/src/composables";

interface Props {
  status: string;
  publishing: boolean;
}

const emit = defineEmits(["onPublish"]);

const props = defineProps<Props>();
const { connected } = useWallet();
const workspace = useWorkspace();

const submit = () => {
  emit("onPublish");
};
</script>

<template>
  <nav
    class="flex justify-between items-center px-10 py-5 md:px-15 montserrat"
    v-if="workspace && workspace.program"
  >
    <div class="flex gap-4 items-center">
      <div
        class="h-10 w-10 cursor-pointer p-2 border rounded font-bold text-lg"
        @click="$router.back()"
      >
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAflBMVEX///8AAAAwMDClpaX8/Pz5+fnn5+c2NjY7Ozvs7Oz6+vrv7+/29vbz8/Pa2trj4+PFxcW5ubl7e3vS0tKBgYEmJiYMDAxeXl6tra2enp6UlJRZWVlISEiHh4dra2vNzc1QUFAYGBgfHx9xcXGPj4+0tLQpKSnAwMA5OTlCQkKKwDBuAAAEiElEQVR4nO2dS3OqQBCFZyKIREUQHyC+MD7i//+DF5JUwpm7yAZqKqfOt2bRXUL3nO6e1hghhBBCCCGEEEIIIYQQQgghhBBCiL9Mks58mzAs+THKAt9GDEiQnq195r7NGI6wmNiG/di3IUMxu67tBxXppzg/buwXR9+2DEL8tD8cfFszAIkFTr7t6Z0bOnj1bU/fBFfwr858G9Q30yM4OKFLiMm5699mu/BtUM+E6b7r4GUV+7aoZ+bFe9fBqJz7tqhn4t266+D+xnacWSw3XQerE5uuyDGIviW+DeqbBwbRK52mKCP4BQu2GGOWF/gF6T7BV3hD7YXuDV1MwMGK7g1N4Q21h1ffBvVNCf7Zm297+iZcgX93OrU7fgMHz2xpPsi3Xf/qJZ1WykArrXd0Wmn00nUwKtikRHwFKXF++Daob5IlxJgjXT3mBDHGHthijCme4OBo6tugvsFyhaXrEoZYrojoPsExlivoSqImRzF4YEvzJoM0b8vQt0F9g1rpwtd2OYCDezqtlKBWOrJpJXOquv7VdDHmNYOS6L1kq8fMR/CGPunqMWPsXW9T3wb1jRNjlnQxJoUYY+nKFaaAonZNV64IUSs9H2xaKV7VEGPotFKCWomuJGpOUBK1V7q+Uoadz5Fve/omRK00oUvzMWqlii7NL7Ak+kZXMcxBStR0k77BA37AF7oYM0WtdKarxywwxvC1XZwRtQPdfAyOqK3ppkRDHIN90k2JTnd3SPMpm1YaL2uIMXTnmKTqNs7qK1vF0Jyw7WIv0QsPrYOZZaY5qO182zAsZnb8/aE/jWF30Jpk//tDf5r/JhDoaELpfHX5/bm/S5stZs6tCS4+Mn54c64PFiMePg81AUzkbSq6+qFxO4UTuj6Taauk3cP3fUdXRGxCall3XKzf6GoYbSURssaZrt3UkICLa7rRp4YZCsXCtz1DgE2LpW9zhmCHlw0Is4bJoOgWMcabHPTUPaUblm1C6rb7pq75ri83khH0VM13Bd2YaQlpg2+NQJMYb3A7Zkt3D73VUyAZ9zfKeANZoyTMjGO4zXxZEoZUZwK6IgypQQou8t3lMu6SuQ3dbEZDjIVGujVzDSEOs2/5EqN5LVFPMcabG+ipJ+H5xuDCuYhuEKUhBz11YSymLnByf0Wo/OMSKo18Q32NnipAMlZ0+zAaUpCME7rhWuPqqfpAKBnHzmITwpA6xZsYfBcV2g1K4OKEUWycsD9V+rZnAJwRo5VvewYgxnizJRQbM6c/RXi+CUbYn6K7QNuAS+nqEaGecpZ+7Qg/RmdxG98ygvaGBoZUwkmxoICQ+s44uZHB0oUN3WIX8/+SQbrFGW39Blzku03U/jECuMi37LOt34CLEWO8eUCJqt4RHuFyR08RFjdivLJBWdxY4eJPxslUd3krYaWRfgGvu3yQsnmzcOIN4fwNLgF9ITykmrD8iTc1oV40bcv/O/nTrZD84vuKWEl4dvvis37Dt/6sQ7tIi/HSVIdZuSU8mAIB4ZFNCCGEEEIIIYQQQgghhBBCCCGEEEIIIYQQ4pN/pGhBkamb6Z0AAAAASUVORK5CYII="
          alt=""
        />
      </div>

      <p class="text-2xl uppercase text-black font-bold open-sans">
        {{ status }}
      </p>
    </div>

    <div class="flex gap-2">
      <base-button
        :loading="publishing"
        secondary
        @click="submit"
        v-if="connected"
      >
        <span v-if="publishing"> Publishing ... </span>

        <span v-else> Publish </span>
      </base-button>
      <div class="px-4">
        <!-- wallet buton -->
        <wallet-modal-provider>
          <wallet-multi-button></wallet-multi-button>
        </wallet-modal-provider>
      </div>
    </div>
  </nav>
</template>
