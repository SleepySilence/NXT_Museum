const body = document.body;
const menuButton = document.getElementById("js--menu");
const navigation = document.getElementById("js--nav");

function setMenu(open) {
    menuButton.setAttribute("aria-expanded", String(open));
    navigation.setAttribute("aria-hidden", String(!open));
    body.classList.toggle("menu-open", open);
}

menuButton.addEventListener("click", () => {
    setMenu(menuButton.getAttribute("aria-expanded") !== "true");
});

navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenu(false);
});

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const year = document.getElementById("current-year");
if (year) year.textContent = new Date().getFullYear();