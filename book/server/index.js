import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mydb",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.stack);
    return;
  }
  console.log("Connected to database.");
});

app.get("/pelanggan", (_req, res) => {
  db.query("SELECT * FROM pelanggan", (err, results) => {
    if (err) {
      console.error("Error fetching users:", err.stack);
      return res.status(500).send("Internal Server Error");
    }
    res.json(results);
  });
});

app.get("/produk", (_req, res) => {
  db.query("SELECT * FROM produk", (err, results) => {
    if (err) {
      console.error("Error fetching products:", err.stack);
      return res.status(500).send("Internal Server Error");
    }
    res.json(results);
  });
});

app.get("/detail-penjualan", (_req, res) => {
  db.query("SELECT * FROM detailpenjualan", (err, results) => {
    if (err) {
      console.error("Error fetching products:", err.stack);
      return res.status(500).send("Internal Server Error");
    }
    res.json(results);
  });
});

app.get("/penjualan", (_req, res) => {
  db.query("SELECT * FROM penjualan", (err, results) => {
    if (err) {
      console.error("Error fetching products:", err.stack);
      return res.status(500).send("Internal Server Error");
    }
    res.json(results);
  });
});

app.post("/pelanggan", (req, res) => {
  const { PelangganID, NamaPelanggan, Alamat, NomorTelepon } = req.body;
  db.query(
    "INSERT INTO pelanggan (PelangganID, NamaPelanggan, Alamat, NomorTelepon) VALUES (?, ?, ?, ?)",
    [PelangganID, NamaPelanggan, Alamat, NomorTelepon],
    (err, results) => {
      if (err) {
        console.error("Error inserting user:", err.stack);
        return res.status(500).send("Internal Server Error");
      }
      res.status(201).json({
        id: results.insertId,
        PelangganID,
        NamaPelanggan,
        Alamat,
        NomorTelepon,
      });
    }
  );
});

app.post("/produk", (req, res) => {
  const { ProdukID, NamaProduk, Harga, Stok } = req.body;
  db.query(
    "INSERT INTO produk (ProdukID, NamaProduk, Harga, Stok) VALUES (?, ?, ?, ?)",
    [ProdukID, NamaProduk, Harga, Stok],
    (err, results) => {
      if (err) {
        console.error("Error inserting product:", err.stack);
        return res.status(500).send("Internal Server Error");
      }
      res.status(201).json({
        id: results.insertId,
        ProdukID,
        NamaProduk,
        Harga,
        Stok,
      });
    }
  );
});

app.listen("80", "192.168.1.34", () => {
  console.log("Server is running on port 192.168.1.34");
});
