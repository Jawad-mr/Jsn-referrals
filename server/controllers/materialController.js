import Material from "../models/Material.js";

export async function getMaterials(req, res) {
  try {
    const materials = await Material.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
    res.json({ materials });
  } catch (err) {
    res.status(500).json({ message: "Could not load materials." });
  }
}

export async function createMaterial(req, res) {
  try {
    const material = await Material.create(req.body);
    res.status(201).json({ material });
  } catch (err) {
    res.status(500).json({ message: "Could not create material." });
  }
}

export async function updateMaterial(req, res) {
  try {
    const material = await Material.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!material) return res.status(404).json({ message: "Material not found." });
    res.json({ material });
  } catch (err) {
    res.status(500).json({ message: "Could not update material." });
  }
}

export async function deleteMaterial(req, res) {
  try {
    await Material.findByIdAndUpdate(req.params.id, { isActive: false });
    res.json({ message: "Material removed." });
  } catch (err) {
    res.status(500).json({ message: "Could not delete material." });
  }
}
