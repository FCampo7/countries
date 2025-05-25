onload = async () => {
	const params = new URLSearchParams(window.location.search);
	const countryName = params.get("name");
	const country = await fetch(
		`https://restcountries.com/v3.1/name/${countryName}`
	)
		.then((response) => response.json())
		.then((data) => data[0])
		.catch((error) => {
			console.error("Error fetching country data:", error);
			return null;
		});
	const container = document.getElementById("country-details");
	var fk = Object.keys(country.name.nativeName)[0];
	var fc = Object.keys(country.currencies);
	var fl = Object.keys(country.languages);
	container.innerHTML = `
        <div class="country-flag">
            <img src="${country.flags.png}" alt="Country Flag" class="flag"/>
        </div>
        <div class="country-info">
            <h2 id="country-name">${country.name.common}</h2>
            <div class="section">
                <div>
                    <p id="country-native-name"><strong>Native Name:</strong> ${
						country.name.nativeName[fk].common
					}</p>
                    <p id="country-population"><strong>Population:</strong> ${Intl.NumberFormat(
						"en-US"
					).format(country.population)}</p>
                    <p id="country-region"><strong>Region:</strong> ${
						country.region
					}</p>
                    <p id="country-subregion"><strong>Sub Region:</strong> ${
						country.subregion
					}</p>
                    <p id="country-capital"><strong>Capital:</strong> ${
						country.capital
					}</p>
                </div>
                <div>
                    <p id="country-top-level-domain"><strong>Top Level Domain:</strong> ${
						country.tld
					}</p>
                    <p id="country-currencies"><strong>Currencies:</strong> ${fc
						.map((element) => country.currencies[element].name)
						.join(", ")}</p>
                    <p id="country-languages"><strong>Languages:</strong> ${fl
						.map((element) => country.languages[element])
						.join(", ")}</p>
                </div>
            </div>
            <div id="country-borders">
                <h3>Border Countries:</h3>
                <div id="border-countries-container">
                </div>
            </div>
        </div>
    `;
	const borders = country.borders;
	const borderContainer = document.getElementById(
		"border-countries-container"
	);
	if (borders) {
		borders.forEach((border) => {
			fetch(`https://restcountries.com/v3.1/alpha/${border}`)
				.then((response) => response.json())
				.then((data) => {
					const borderCountry = data[0];
					borderContainer.innerHTML += `
                        <a href="./details.html?name=${borderCountry.name.common}">
                            <div class="border-country">
                                <p>${borderCountry.name.common}</p>
                            </div>
                        </a>
                    `;
				})
				.catch((error) => {
					console.error("Error fetching border country data:", error);
				});
		});
	} else {
		borderContainer.innerHTML += `<p>No border countries found.</p>`;
	}
};
