const sqlite3 = require("sqlite3").verbose();

export default function handler(req, res) {
  const db = new sqlite3.Database("test.db");

  db.run(
    "CREATE TABLE IF NOT EXISTS users (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, Phone_Number INTEGER NOT NULL, email TEXT NOT NULL)"
  );

  if (req.method == "POST") {
    let phone_number = req.body.phone_number;
    let name = req.body.name;
    let email = req.body.email;

    console.log(email);

    db.run(
      "INSERT INTO users (name, Phone_Number, email) VALUES(?, ?, ?)",
      [name, phone_number, email],
      function (err) {
        return res.status(200).json({ id: this.lastID});

         
      }
    );
  }
}