const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
// Card spotlight follows the pointer
document.querySelectorAll(".card").forEach(c => c.addEventListener("pointermove", e => {
    const r = c.getBoundingClientRect();
    c.style.setProperty("--mx", e.clientX - r.left + "px");
    c.style.setProperty("--my", e.clientY - r.top + "px");
}));
// Moon follows the pointer a little
const moon = document.getElementById("moon");
if (!reduce) addEventListener("pointermove", e => moon.style.transform = `translate(${(e.clientX / innerWidth - .5) * -30}px,${(e.clientY / innerHeight - .5) * -30}px)`);
// Typing code panel
const sample = "const me = {\n  name: \"Zweli\",\n  skills: [\"HTML\", \"CSS\", \"JS\"],\n  building: true\n};";
const codeEl = document.getElementById("code");
let n = 0;
(function type() {
    n++;
    codeEl.textContent = sample.slice(0, reduce ? sample.length : n);
    if (!reduce && n < sample.length) setTimeout(type, 45);
})();
// Project filter
function setFilter(f) {
    document.querySelectorAll(".chip").forEach(b => {
        b.classList.toggle("on", b.dataset.f === f);
        b.setAttribute("aria-pressed", b.dataset.f === f);
    });
    document.querySelectorAll(".proj").forEach(p => p.hidden = f !== "all" && p.dataset.k !== f);
}
document.querySelectorAll(".chip").forEach(b => b.addEventListener("click", () => setFilter(b.dataset.f)));
document.querySelectorAll("a[data-f]").forEach(a => a.addEventListener("click", () => setFilter(a.dataset.f)));
// Highlight the current section in the nav
const links = document.querySelectorAll(".links a");
const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) links.forEach(l => l.classList.toggle("on", l.getAttribute("href") === "#" + e.target.id));
}), {
    rootMargin: "-45% 0px -50% 0px"
});
document.querySelectorAll("section[id]").forEach(s => io.observe(s));