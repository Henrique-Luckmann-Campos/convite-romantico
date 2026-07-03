const SUPABASE_URL = "https://xkmelbpijzbzahhloswf.supabase.co";
const SUPABASE_KEY = "sb_publishable_CmwtANvXL1p7Ne_MDtD9tQ_6S7rwsrF";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function carregarRespostas() {
  const { data, error } = await supabaseClient
    .from("respostas")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error("Erro ao carregar do Supabase:", error);
    alert("Erro ao carregar as respostas.\n" + error.message);
    return;
  }

  const tbody = document.querySelector("#tabela tbody");
  const vazio = document.getElementById("vazio");
  tbody.innerHTML = "";

  if (!data || data.length === 0) {
    vazio.style.display = "block";
    return;
  }
  vazio.style.display = "none";

  data.forEach((row) => {
    const tr = document.createElement("tr");

    // Acha automaticamente a coluna de data/hora, seja qual for o nome
    const chaveData = Object.keys(row).find(
      (k) => k !== "id" && k !== "comida"
    );
    const valorData = chaveData ? row[chaveData] : null;

    const tdData = document.createElement("td");
    tdData.textContent = valorData
      ? new Date(valorData).toLocaleString("pt-BR")
      : "-";

    const tdComida = document.createElement("td");
    tdComida.textContent = row.comida;

    tr.appendChild(tdData);
    tr.appendChild(tdComida);
    tbody.appendChild(tr);
  });
}

document.addEventListener("DOMContentLoaded", carregarRespostas);
