<template>
  <div>
    <form v-on:submit.prevent="handleSubmit">
      <div class="pb-20 text-indigo-700">
        <p class="text-7xl">Rekruit</p>
      </div>
      <div class="mx-60 my-20">
        <div
          class="question-text relative border border-black rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-beauty-600 focus-within:border-beauty-600"
        >
          <label
            for="name"
            class="absolute -top-2 left-4 -mt-2 inline-block px-1 bg-white text-xs font-medium text-black text-xl"
            :class="[{ 'text-beauty-600': question_focused }, '']"
            >Question</label
          >
          <input
            type="text"
            v-model="question"
            class="block w-full border-0 p-5 text-black placeholder-gray-500 focus:ring-0 sm:text-2xl"
            placeholder="Quetion text"
            @focus="update_focus"
            @blur="update_focus"
          />
        </div>
        <div class="answer-group pl-10 py-5">
          <div
            class="flex space-x-4 align-middle items-center justify-center py-3"
            v-for="(item, id) in answers"
            :key="id"
          >
            <input
              type="text"
              class="shadow-sm focus:ring-beauty-500 p-4 focus:border-beauty-500 block w-full sm:text-2xl border-black rounded-md text-black"
              placeholder="Response 1 text"
              v-model="item.text"
            />
            <input
              class="form-check-input appearance-none h-6 w-6 rounded-sm bg-white text-beauty-600 checked:border-beauty-600 focus:outline-none transition duration-200 mt-1 align-middle bg-no-repeat bg-center bg-contain cursor-pointer focus:ring-0 pr-1 border-2 border-black"
              type="checkbox"
              v-model="item.checked"
            />
          </div>
        </div>
        <button
          type="submit"
          class="float-right inline-flex items-center px-24 py-7 border border-transparent font-medium rounded-md shadow-sm text-white focus:outline-none rounded-full text-2xl"
          :class="[
            !validated
              ? 'bg-gray-400 hover:bg-gray-400'
              : 'bg-beauty-600 hover:bg-beauty-500',
          ]"
          :disabled="!validated"
        >
          SAVE
        </button>
      </div>
    </form>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";

type Answer = {
  text: string;
  checked: boolean;
};

export default class CreateSurvey extends Vue {
  answers: Answer[] = [];
  question = "";
  question_focused = false; // this is for handling question label color while the focus is updated

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  beforeMount() {
    // initialize the answers before the component is mounted
    for (let i = 0; i < 4; i++) {
      this.answers.push({
        text: "",
        checked: false,
      });
    }
  }

  handleSubmit(): void {
    // there are two considerable types of output.
    let result_1 = {
      // this result set contains question and answers with selected status
      question: this.question,
      answers: this.answers,
    };
    let correct_answers = [];
    for (const id in this.answers) {
      if (this.answers[id].checked) correct_answers.push(Number(id));
    }
    let result_2 = {
      // this set contains question, possible answers and correct answers (the array of selected answers)
      question: this.question,
      possible_answers: this.answers.map((answer) => answer.text),
      correct_answers: correct_answers,
    };
    console.log(result_1, result_2);
  }

  get validated(): boolean {
    // this checks input validation
    if (this.question.trim().length === 0) return false; // if the question is empty validation is failed
    let nothing_checked = true;
    for (let answer of this.answers) {
      if (answer.text.trim().length === 0) return false; // if any answer is empty validation is failed
      if (answer.checked) nothing_checked = false;
    }
    if (nothing_checked) return false; // if no answer is selected validation is failed
    return true; // yay! validated
  }
  update_focus(): void {
    // this triggers when user goes in and out the question input
    this.question_focused = !this.question_focused;
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
