const branch = "main";
const env = "Production";

console.log(`[${env}] MyApp loaded on branch: ${branch}`);

document.addEventListener("DOMContentLoaded", () => {
    console.log("Production environment is live.");
});
