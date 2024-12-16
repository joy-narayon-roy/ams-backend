require("dotenv").config();

function main() {
  console.log(process.env.ALLOW_ORIGIN.split(','));
}

main();
