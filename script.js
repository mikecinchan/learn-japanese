document.getElementById('romaji').addEventListener('input', async function (e) {
  const romaji = e.target.value.trim().toLowerCase();
  if (!romaji) return;

  const kanaText = wanakana.toKana(romaji);
  document.getElementById('kana').textContent = `Kana: ${kanaText}`;

  const strokeArea = document.getElementById('stroke-area');
  strokeArea.innerHTML = '';

  for (const char of kanaText) {
    if (/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/.test(char)) {
      try {
        const codepoint = char.codePointAt(0).toString(16).toUpperCase().padStart(5, '0');
        const filepath = `./animCJK/svgsJaKana/${codepoint}.svg`;

        const res = await fetch(filepath);
        if (!res.ok) throw new Error("SVG not found");
        const svgText = await res.text();

        const wrapper = document.createElement('div');
        wrapper.innerHTML = svgText;
        const svg = wrapper.querySelector('svg');
        if (svg) strokeArea.appendChild(svg);
      } catch (err) {
        console.warn(`No stroke data for: ${char}`);
      }
    }
  }
});
