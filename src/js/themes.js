function setTheme(theme) {
	document.body.classList.remove("theme-light", "theme-dark");
	document.body.classList.add(theme);
	localStorage.setItem("theme", theme);
}

window.addEventListener("DOMContentLoaded", () => {
	const savedTheme = localStorage.getItem("theme") || "theme-light";
	document.body.classList.add(savedTheme);
});
