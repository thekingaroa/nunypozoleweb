import { pool } from "../db.js";

export const getInventory = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM tb_ims ORDER BY DESCRIP");
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const getItem = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM tb_ims WHERE ID = ?", [
      req.params.id,
    ]);
    if (result.length === 0)
      return res.status(404).json({ message: "Articulo no encontrado" });

    res.json(result[0]);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const createItem = async (req, res) => {
  try {
    const { description, u_medida } = req.body;

    const [validate] = await pool.query(
      "SELECT * FROM tb_ims WHERE DESCRIP = ?",
      description
    );
    if (validate.length === 0) {
      const [result] = await pool.query(
        "INSERT INTO tb_ims (DESCRIP, U_MEDIDA) VALUES (?, ?)",
        [description, u_medida]
      );
      res.json({
        id: result.insertId,
        description: description,
      });
    } else return res.status(500).json({ msg: "This item alredy exist" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM tb_ims WHERE ID = ?", [req.params.id]);
        if(result.affectedRows === 0)
            return res.status(404).json({ message: "ID no encontrada" });
        return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const updateItem = async (req, res) => {
  try {
    const [result] = await pool.query(
      "UPDATE tb_inventory SET ? WHERE ID = ? ",
      [req.body, req.params.id]
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
