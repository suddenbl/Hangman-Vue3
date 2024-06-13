import { onMounted, ref } from 'vue';
import { getRandomName } from '../api/getRandomName';

export const useRandomWord = () => {
  const word = ref('');

  const getRandomWord = async () => {
    try {
      const name = await getRandomName();
      word.value = name.toLowerCase();
    } catch (e) {
      console.log(e);
      word.value = '';
    }
  };

  onMounted(() => {
    getRandomWord();
  });

  return {
    word,
    getRandomWord,
  };
};
