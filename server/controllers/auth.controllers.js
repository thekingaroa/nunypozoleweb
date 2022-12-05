import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../db.js";

function generateToken(user) {
  const tokenSecret = "nunypozole$..";
  return jwt.sign({ data: user }, tokenSecret, { expiresIn: "24h" });
}

export const authLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const [result] = await pool.query(
      "SELECT * FROM tb_users WHERE USERNAME = ?",
      username
    );
    //console.log(result);
    if (result.affectedRows != 0)
      bcrypt.compare(password, result[0].PASSW, (error, match) => {
        if (error) return res.status(501).json(error);
        else if (match)
          return res
            .status(200)
            .json({ token: generateToken(result.USERNAME) });
        else return res.status(404).json({ error: "Passwords do not match" });
      });
    else return res.status(404).json({ error: "User not found" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const authSign = async (req, res) => {
  try {
    const { username, password, name } = req.body;
    const [rows] = await pool.query(
      "SELECT * FROM tb_users WHERE USERNAME = ?",
      username
    );
    console.log(rows);
    if (rows.length === 0) {
      bcrypt.hash(password, 10, async (error, hash) => {
        if (error) return res.status(500).json({ error: error });
        else {
          const [result] = await pool.query(
            "INSERT INTO tb_users (USERNAME, PASSW, NAME) VALUES (?, ?, ?)",
            [username, hash, name]
          );
          res.status(200).json({ token: generateToken(username) });
        }
      });
    } else {
      return res.status(404).json({ msg: "User already taken." });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
