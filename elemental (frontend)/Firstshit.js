let steps = [];
let stepIndex = 0;

async function loadElement() {
  const element = document.getElementById("elementInput").value;

  const res = await fetch(
    "https://elemental-backend-2sdc.onrender.com/",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ element })
    }
  );

  const data = await res.json();
  document.getElementById("content").classList.remove("hidden");

  document.getElementById("atomic").innerText = data.atomic_number;
  document.getElementById("mass").innerText = data.mass_number;
  document.getElementById("period").innerText = data.period;
  document.getElementById("group").innerText = data.group;
  document.getElementById("valency").innerText = data.valency;
  document.getElementById("config").innerText = data.electron_configuration;

  document.getElementById("aufbau").innerText = data.why_this_configuration_works.aufbau_principle;
  document.getElementById("hund").innerText = data.why_this_configuration_works.hunds_rule;
  document.getElementById("pauli").innerText = data.why_this_configuration_works.pauli_exclusion_principle;

  steps = data.subshell_filling_steps;
  stepIndex = 0;
  document.getElementById("stepBox").innerText = steps[0];

  document.getElementById("radioactive").classList.toggle(
    "hidden",
    !data.radioactive
  );
}

function nextStep() {
  if (stepIndex < steps.length - 1) {
    stepIndex++;
    document.getElementById("stepBox").innerText = steps[stepIndex];
  }
}