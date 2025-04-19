const mainContent = document.getElementById("main-content");

let pelangganData;

const clickHandler = (e) => {
  if (e === "pelanggan") {
    mainContent.innerHTML = "";
    pelanggan();
  } else if (e === "produk") {
    mainContent.innerHTML = "";
    produk();
  } else if (e === "penjualan") {
    mainContent.innerHTML = "";
    penjualan();
  }
};

const pelanggan = () => {
  mainContent.innerHTML = `
      <div class="pelanggan-container data-container" id="pelanggan-container">
        <h1>Pelanggan</h1>
        <form id="pelanggan-form" class="post-form">
          <input
            type="text"
            id="nama-pelanggan"
            placeholder="Nama Pelanggan"
            required
          />
          <input type="text" id="alamat" placeholder="Alamat" required />
          <input
            type="number"
            id="nomor-telepon"
            placeholder="Nomor Telepon"
            required
          />
          <button type="submit" onclick="addPelanggan()">Add Pelanggan</button>
        </form>

        <div class="pelanggan-list data-list" id="pelanggan-list"></div>
      </div>
    `;
  fetchPelanggan();
};

const produk = () => {
  mainContent.innerHTML = `
      <div class="produk-container data-container" id="produk-container">
      <h1>Produk</h1>
      <form id="produk-form" class="post-form">
        <input
          type="text"
          id="nama-produk"
          placeholder="Nama Produk"
          required
        />
        <input type="number" id="harga" placeholder="Harga" required />
        <input type="number" id="stok" placeholder="Stok" required />
        <button type="submit">Add Produk</button>
      </form>
      <div class="produk-list data-list" id="produk-list"></div>
    </div>
  `;
  fetchProduk();
};

const penjualan = () => {
  mainContent.innerHTML = `
    <div class="penjualan-container" id="penjualan-container">
      <h1>Penjualan</h1>
      <div class="penjualan-list data-list" id="penjualan-list"></div>
    </div>
    `;
  fetchPenjualan();
};

async function fetchPelanggan(id) {
  try {
    const res = await fetch("http://192.168.1.34/pelanggan");
    if (!res.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    data = await res.json();

    data.forEach((pelanggan) => {
      mainContent.children[0].children[2].innerHTML += `
      <div class="data-item">
        <h2>ID: ${pelanggan.PelangganID}</h2>
        <p>Nama: ${pelanggan.NamaPelanggan}</p>
        <p>Alamat: ${pelanggan.Alamat}</p>
        <p>Kontak: ${pelanggan.NomorTelepon}</p>
      </div>
      `;
    });
  } catch (error) {
    console.log("Error:", error);
  }

  const pelangganForm = document.getElementById("pelanggan-form");
  pelangganForm.addEventListener("submit", addPelanggan);
}

async function fetchProduk() {
  try {
    const response = await fetch("http://192.168.1.34/produk");
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();

    data.forEach((produk) => {
      mainContent.children[0].children[2].innerHTML += `
      <div class="data-item">
        <h2>ID: ${produk.ProdukID}</h2>
        <p>Nama: ${produk.NamaProduk}</p>
        <p>Harga: ${produk.Harga}</p>
        <p>Stok: ${produk.Stok}</p>
      </div>
  `;
    });
  } catch (err) {
    console.error("Error fetching products:", err.stack);
  }

  const produkForm = document.getElementById("produk-form");
  produkForm.addEventListener("submit", addProduk);
}

async function fetchPenjualan() {
  try {
    const res = await fetch("http://192.168.1.34/penjualan");
    if (!res.ok) {
      throw new Error("Network response was not ok " + res.statusText);
    }
    const data = await res.json();

    data.forEach((penjualan) => {
      const pelanggan = pelangganData.find(
        (pelanggan) => pelanggan.PelangganID === penjualan.PelangganID
      );
      const tanggalPenjualan = penjualan.TanggalPenjualan.split("T")[0];
      mainContent.children[0].children[2].innerHTML.innerHTML += `
      <div class="data-item">
        <h2>${penjualan.PenjualanID}</h2>
        <p>Pelanggan: ${pelanggan ? pelanggan.NamaPelanggan : "Unknown"}</p>
        <p>Tanggal Penjualan: ${tanggalPenjualan}</p>
        <p>Total Harga: ${penjualan.TotalHarga ? penjualan.TotalHarga : "-"}</p>
      </div>
      `;
    });
  } catch (err) {
    console.log("Error fetching penjualan:", err.stack);
  }
}

async function addPelanggan(e) {
  e.preventDefault();
  const NamaPelanggan = mainContent.children[0].children[1].children[0].value;
  const Alamat = mainContent.children[0].children[1].children[1].value;
  const NomorTelepon = mainContent.children[0].children[1].children[2].value;
  const pelangganLength =
    mainContent.children[0].children[2].children.length + 1;

  try {
    const res = await fetch("http://192.168.1.34/pelanggan", {
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

  mainContent.children[0].children[2].innerHTML = "";

  fetchPelanggan();
}

async function addProduk(e) {
  e.preventDefault();

  const NamaProduk = mainContent.children[0].children[1].children[0].value;
  const Harga = mainContent.children[0].children[1].children[1].value;
  const Stok = mainContent.children[0].children[1].children[2].value;
  const produkLength = mainContent.children[0].children[2].children.length + 1;

  try {
    const response = await fetch("http://192.168.1.34/produk", {
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

  mainContent.innerHTML = "";
  produk();
}
