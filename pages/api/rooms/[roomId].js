export default async (req, res) => {
    const {roomId} = req.query
    const response = await fetch(`http://localhost:3000/rooms/${roomId}`)
    const data = await response.json()

    res.status(200).json(data)
}