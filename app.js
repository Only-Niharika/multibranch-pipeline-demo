const branch = "dev";
const env = "Development";

console.log(`[${env}] MyApp loaded on branch: ${branch}`);

document.addEventListener("DOMContentLoaded", () => {
    console.log("Dev environment ready. Debug mode ON.");
    // Dev-only floating debug badge
    const debug = document.createElement("div");
    debug.style = "position:fixed;bottom:10px;right:10px;background:#1e3a5f;color:#bfdbfe;padding:8px 14px;border-radius:8px;font-size:12px;border:1px solid #3b82f6;";
    debug.innerText = "🔵 DEV MODE";
    document.body.appendChild(debug);
});
