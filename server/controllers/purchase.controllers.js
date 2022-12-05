import { pool } from "../db.js";

export const addPurchase = async (req, res) => {
    const [result] = await pool.query("INSERT INTO tb_ims (CANTIDAD) VALUES (?)", [req.body.cantidad]);
}