<script setup lang="ts">
import GameHeader from './components/GameHeader.vue';
import GameFigure from './components/GameFigure.vue';
import GameWrongLetters from './components/GameWrongLetters.vue';
import GameWord from './components/GameWord.vue';
import GamePopUp from './components/GamePopUp.vue';
import GameNotification from './components/GameNotification.vue';
import { ref, watch } from 'vue';
import { useRandomWord } from './composables/useRandomWord';
import { useLetters } from './composables/useLetters';
import { useNotification } from './composables/useNotification';

const { word, getRandomWord } = useRandomWord();
const {
  letters,
  correctLetters,
  wrongLetters,
  isStatusLose,
  isStatusWin,
  addLetters,
  resetLetters,
} = useLetters(word);
const { notification, showNotification } = useNotification();
const popup = ref<InstanceType<typeof GamePopUp> | null>(null);

const restart = async () => {
  await getRandomWord();
  resetLetters();
  popup.value?.close();
};

watch(wrongLetters, () => {
  if (isStatusLose.value) {
    popup.value?.open('lose');
  }
});

watch(correctLetters, () => {
  if (isStatusWin.value) {
    popup.value?.open('win');
  }
});

window.addEventListener('keydown', ({ key }) => {
  if (isStatusLose.value || isStatusWin.value) {
    return;
  }

  if (letters.value.includes(key)) {
    showNotification();
    return;
  }

  addLetters(key);
});
</script>

<template>
  <div>
    <GameHeader />
    <div class="game-container">
      <GameFigure :wrong-letters-count="wrongLetters.length" />
      <GameWrongLetters :wrong-letters="wrongLetters" />
      <GameWord :word="word" :correct-letters="correctLetters" />
    </div>
    <GamePopUp ref="popup" :word="word" @restart="restart" />
    <GameNotification ref="notification" />
  </div>
</template>
