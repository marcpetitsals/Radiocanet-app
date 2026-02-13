// ==========================
// Reproductor de Radio en Directe
// ==========================
const audio = document.getElementById("radioPlayer");
const playBtn = document.getElementById("playBtn");

function toggleRadio() {
  if (audio.paused) {
    audio.play();
    playBtn.textContent = "⏸️ Pausar Ràdio";
  } else {
    audio.pause();
    playBtn.textContent = "▶️ Reproduir Ràdio";
  }
}

playBtn.addEventListener("click", toggleRadio);


// ==========================
// Podcasts separats per programa
// ==========================
const programs = [
  { name: "Informatiu", slug: "informatiumigdia" },
  { name: "Tal com sona", slug: "tal-com" },
  { name: "Ona Maresme", slug: "onamaresme" },
  { name: "Ple Municipal", slug: "plemunicipal" },
  { name: "Ple Extraordinari", slug: "pleextraordinari" },
  { name: "Oxigen", slug: "fake-news" }
];

const container = document.getElementById("podcasts");

programs.forEach(program => {

  const section = document.createElement("div");
  section.className = "podcast-program";
  section.innerHTML = `<h3>📻 ${program.name}</h3>`;
  container.appendChild(section);

  // Construïm la URL del RSS
  const rssUrl = `https://rssraw.enacastapis.com/podcast_rss/radiocanetdemar/${program.slug}.rss`;

  // Convertim RSS a JSON via rss2json
  fetch(`https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`)
    .then(res => res.json())
    .then(data => {
      if (!data.items || data.items.length === 0) {
        section.innerHTML += "<p>No hi ha episodis disponibles.</p>";
        return;
      }

      // Últims 3 episodis
      data.items.slice(0,3).forEach(item => {
        const episode = document.createElement("div");
        episode.className = "podcast-episode";

        episode.innerHTML = `
          <div class="episode-title">${item.title}</div>
          <audio controls src="${item.enclosure.link}"></audio>
        `;

        section.appendChild(episode);
      });
    })
    .catch(err => {
      console.error("Error cargando RSS:", err);
      section.innerHTML += "<p>No s'han pogut carregar.</p>";
    });
});
