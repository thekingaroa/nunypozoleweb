import { pool } from "../db.js";

export const addPurchase = async (req, res) => {
  try {
    const { id, cantidad } = req.body;
    const [result] = await pool.query(
      "UPDATE tb_ims SET CANTIDAD = ? WHERE ID = ?",
      [cantidad, id]
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

