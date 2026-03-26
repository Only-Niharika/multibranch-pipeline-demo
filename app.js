const branch = "feature";
const env = "Feature";

console.log(`[${env}] MyApp loaded on branch: ${branch}`);

document.addEventListener("DOMContentLoaded", () => {
    console.log("Feature branch active. Experimental mode ON.");
    const debug = document.createElement("div");
    debug.style = "position:fixed;bottom:10px;right:10px;background:#3b0764;color:#e9d5ff;padding:8px 14px;border-radius:8px;font-size:12px;border:1px solid #a855f7;";
    debug.innerText = "🟣 FEATURE MODE";
    document.body.appendChild(debug);
});
