const produkList = document.getElementById("produk-list");
const produkForm = document.getElementById("produk-form");

async function fetchProduk() {
  try {
    const response = await fetch("http://localhost:3000/produk");
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();

    data.forEach((produk) => {
      produkList.innerHTML += `
      <div class="data-item">
        <h2>${produk.ProdukID}</h2>
        <p>Nama Produk: ${produk.NamaProduk}</p>
        <p>Harga Produk: ${produk.Harga}</p>
        <p>Stok Produk: ${produk.Stok}</p>
      </div>
  `;
    });
  } catch (err) {
    console.error("Error fetching products:", err.stack);
  }
}

async function addProduk(e) {
  e.preventDefault();

  const NamaProduk = document.getElementById("nama-produk").value;
  const Harga = document.getElementById("harga").value;
  const Stok = document.getElementById("stok").value;
  const produkLength = produkList.children.length + 1;

  try {
    const response = await fetch("http://localhost:3000/produk", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ProdukID: produkLength,
        NamaProduk,
        Harga,
        Stok,
      }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    console.log("Response:", data);
  } catch (err) {
    console.error("Error:", err);
  }
}

produkForm.addEventListener("submit", addProduk);

fetchProduk();
