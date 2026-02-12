function toggleRadio() {
  const player = document.getElementById("radioPlayer");
  const button = document.getElementById("playButton");

  if (player.paused) {
    player.play();
    button.textContent = "⏸ Pausar";
  } else {
    player.pause();
    button.textContent = "▶ Escuchar";
  }
}
// URL de tu Worker
const NEWS_URL = https://misty-bread-a143.marcpetitsalas.workers.dev;

fetch(NEWS_URL)
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("news");
    container.innerHTML = "";

    data.forEach(title => {
      const div = document.createElement("div");
      div.className = "news-item";
      div.textContent = title;
      container.appendChild(div);
    });
  })
  .catch(err => {
    console.error("Error cargando noticias:", err);
    document.getElementById("news").textContent = "No se pudieron cargar las noticias.";
  });

