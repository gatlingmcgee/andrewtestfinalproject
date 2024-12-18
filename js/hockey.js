teamDetails = []
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '472ac25993msha03284bcae70e16p15acddjsn2fb3e993030c',
		'x-rapidapi-host': 'hockey-highlights-api.p.rapidapi.com'
	}
};


let getTeamsBtn = document.getElementById("getTeams");
getTeamsBtn.addEventListener('click', getNHLTeams);

function getNHLTeams() {
  fetch(`https://hockey-highlights-api.p.rapidapi.com/teams`, options)
  .then(response => response.json())
  .then(data => {
      for (let team of data.data) {
          if (!team.id || !team.name || !team.logo) {
              console.warn(`Skipping team with missing data:`, team);
              continue;
          }

          const html = `
              <img id="${team.id}" src="${team.logo}" alt="logo">
              <h2>Team: ${team.name}</h2>
              <p>ID: ${team.id}</p>
          `;
          document.getElementById('showTeams').insertAdjacentHTML('beforeend', html);

          let teamLogo = document.getElementById(team.id);
          teamLogo.addEventListener('click', () => showDetails(team.id, team.name, team.logo));
      }
  })
  .catch(error => console.error(error));
}


function showDetails(teamId, teamName, teamLogo) {
          fetch(`https://hockey-highlights-api.p.rapidapi.com/matches/${teamId}`, options)
          .then(response => response.json())
          .then(teamDetails => {
            console.log("Full API response for team details:", teamDetails);
            // Check if the response contains a valid `data` property
            if (teamDetails.length >= 0) {
                const team = teamDetails[0];
                const html = `<img id=${team.id} src="${teamLogo}" alt="logo">
                <h2>Team: ${teamName}</h2>
                <h3>${team.homeTeam.name}</h3>
                <h3>vs ${team.awayTeam.name}</h3>
                <p>Country: ${team.country.name}</p>
                <p>League: ${team.league.name}</p>
                <p>Current Score: ${team.state.score.current}</p>
                <p>Date: ${team.date}</p>`;
                document.getElementById('getDetails').insertAdjacentHTML('beforeend', html);
            } else {
                console.error("Unexpected API response:", teamDetails[0]);
            }
        })
        .catch(error => console.error(error));
}
