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
