setInterval(() => console.log("I'm still running"), 300);
setTimeout(() => {
  console.log("Okay now I terminate on my own.");
  process.exit(0)
}, 5000);