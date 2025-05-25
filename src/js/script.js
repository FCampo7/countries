async function get_data() {
	const response = await fetch("https://restcountries.com/v3.1/all");
	const data = await response.json();
	const container = document.getElementById("countries");
	data.forEach((country) => {
		container.innerHTML += `
			<a href="./pages/details.html?name=${country.name.common}" class="card">
				<div class="card-image">
					<img src="${country.flags.png}" alt="${country.flags.alt}" />
				</div>
				<div class="card-info">
					<h2>${country.name.common}</h2>
					<p><strong>Population:</strong> ${Intl.NumberFormat("en-US").format(
						country.population
					)}</p>
					<p class="region"><strong>Region:</strong> ${country.region}</p>
					<p><strong>Capital:</strong> ${country.capital}</p>
				</div>
			</a>
        `;
	});
}

function filterCountries() {
	const filter = document.getElementById("search-input").value.toLowerCase();
	const cards = document.querySelectorAll(".card");
	cards.forEach((card) => {
		const countryName = card.querySelector("h2").textContent.toLowerCase();
		if (countryName.includes(filter)) {
			card.style.display = "flex";
		} else {
			card.style.display = "none";
		}
	});
}

function toggleRegionPicker() {
	const regionPicker = document.getElementById("region-picker");
	if (
		regionPicker.style.display === "none" ||
		regionPicker.style.display === ""
	) {
		regionPicker.style.display = "block";
	} else {
		regionPicker.style.display = "none";
	}
}

function filterByRegion(region) {
	const cards = document.querySelectorAll(".card");
	cards.forEach((card) => {
		const cardRegion = card
			.getElementsByClassName("region")[0]
			.textContent.replace("Region:", "")
			.trim();
		if (region === "All" || cardRegion === region) {
			card.style.display = "block";
		} else {
			card.style.display = "none";
		}
	});
	const regionPicker = document.getElementsByClassName("picker")[0];
	if (region === "All") {
		regionPicker.innerHTML = `
				Filter by Region
				<span class="arrow">▼</span>
		`;
	} else {
		regionPicker.innerHTML = `
				${region}
				<span class="arrow">▼</span>
		`;
	}
	toggleRegionPicker();
}
