import { reactive } from "vue";
export const pageinationincval = reactive({
  pageval: 1,
  pageEventinc() {
    return this.pageval++;
  },
  pageEventdec() {
    if (this.pageval === 1) {
      return this.pageval;
    } else {
      return this.pageval--;
    }
  },
});
