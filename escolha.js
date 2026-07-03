const SUPABASE_URL = "https://xkmelbpijzbzahhloswf.supabase.co";
const SUPABASE_KEY = "sb_publishable_CmwtANvXL1p7Ne_MDtD9tQ_6S7rwsrF";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function salvarResposta(comida) {
  const { error } = await supabaseClient
    .from("respostas")
    .insert([{ comida }]);

  if (error) {
    console.error("Erro ao salvar no Supabase:", error);
    alert("Ocorreu um erro ao salvar, tenta de novo? 😥\n" + error.message);
    return false;
  }
  return true;
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  const telaForm = document.getElementById("tela-form");
  const telaObrigado = document.getElementById("tela-obrigado");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let comida = document.getElementById("comida").value;
    const outro = document.getElementById("outro").value;

    if (comida === "Outro") {
      comida = outro.trim();
    }

    if (!comida) {
      alert("Escreve o que você quer comer! 😅");
      return;
    }

    const ok = await salvarResposta(comida);
    if (ok) {
      telaForm.style.display = "none";
      telaObrigado.style.display = "block";
    }
  });
});
