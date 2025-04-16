const penjualanList = document.getElementById("penjualan-list");

async function fetchPelanggan(id) {
  try {
    const res = await fetch("http://192.168.1.34/pelanggan");
    if (!res.ok) {
      throw new Error("Network response was not ok " + res.statusText);
    }
    const data = await res.json();

    const pelanggan = data.find((pelanggan) => pelanggan.PelangganID === id);
    return pelanggan ? pelanggan.NamaPelanggan : "Unknown";
  } catch (err) {
    console.error("Error fetching pelanggan:", err.stack);
    return "Error";
  }
}

async function fetchPenjualan() {
  try {
    const res = await fetch("http://192.168.1.34/penjualan");
    if (!res.ok) {
      throw new Error("Network response was not ok " + res.statusText);
    }
    const data = await res.json();

    for (const penjualan of data) {
      const namaPelanggan = await fetchPelanggan(penjualan.PelangganID);
      const tanggalPenjualan = penjualan.TanggalPenjualan.split("T")[0];
      penjualanList.innerHTML += `
      <div class="data-item">
        <h2>${penjualan.PenjualanID}</h2>
        <p>Pelanggan: ${namaPelanggan}</p>
        <p>Tanggal Penjualan: ${tanggalPenjualan}</p>
        <p>Total Harga: ${penjualan.TotalHarga ? penjualan.TotalHarga : "-"}</p>
      </div>
      `;
    }
  } catch (err) {
    console.log("Error fetching penjualan:", err.stack);
  }
}

fetchPenjualan();
