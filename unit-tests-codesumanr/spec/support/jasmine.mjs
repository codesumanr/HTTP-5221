export default {
  spec_dir: "spec",
  spec_files: [
    "**/*[sS]pec.?(m)js"
  ],
  env: {
    stopSpecOnExpectationFailure: false,
    random: true,
  },
};