const pelangganList = document.getElementById("pelanggan-list");
const pelangganForm = document.getElementById("pelanggan-form");

async function fetchPelanggan() {
  try {
    const res = await fetch("http://localhost:3000/pelanggan");
    if (!res.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await res.json();
    console.log("Data:", data);

    data.forEach((pelanggan) => {
      pelangganList.innerHTML += `
      <div class="data-item">
        <h2>${pelanggan.PelangganID}</h2>
        <p>${pelanggan.NamaPelanggan}</p>
        <p>${pelanggan.Alamat}</p>
        <p>${pelanggan.NomorTelepon}</p>
      </div>
      `;
    });
  } catch (error) {
    console.log("Error:", error);
  }
}

async function addPelanggan(e) {
  e.preventDefault();

  const NamaPelanggan = document.getElementById("nama-pelanggan").value;
  const Alamat = document.getElementById("alamat").value;
  const NomorTelepon = document.getElementById("nomor-telepon").value;
  const pelangganLength = pelangganList.children.length + 1;

  try {
    const res = await fetch("http://localhost:3000/pelanggan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        PelangganID: pelangganLength,
        NamaPelanggan,
        Alamat,
        NomorTelepon,
      }),
    });
    if (!res.ok) {
      throw new Error("Network response was not ok " + res.statusText);
    }
    const data = await res.json();
    console.log("Response:", data);
  } catch (err) {
    console.error("Error:", err);
  }
}

pelangganForm.addEventListener("submit", addPelanggan);

fetchPelanggan();
