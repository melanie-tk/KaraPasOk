export async function create(req, res) {
    try {
        const newSalle = await repo.createSalle(req.body);
        res.json({
            message: "Salle reservé",
            data: newSalle
        });
    } catch (err) {
        res.json({ message: err.message });
    }
}
