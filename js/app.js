function toggleRadio() {
  const player = document.getElementById("radioPlayer");
  const button = document.getElementById("playButton");

  if (player.paused) {
    player.play();
    button.textContent = "⏸ Pausar";
  } else {
    player.pause();
    button.textContent = "▶ Escoltar";
  }
}
// URL de tu Worker que devuelve noticias
const NEWS_URL = "https://misty-bread-a143.marcpetitsalas.workers.dev/";

fetch(NEWS_URL)
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("news");
    container.innerHTML = "";

    data.forEach(item => {
      const card = document.createElement("a");
      card.href = item.link;
      card.target = "_blank";
      card.className = "news-card";

      card.innerHTML = `
        <img src="${item.image}" class="news-img">
        <div class="news-text">${item.title}</div>
      `;

      container.appendChild(card);
    });
  })
  .catch(err => {
    document.getElementById("news").textContent = "No s'han pogut carregar les notìcies.";
  });


