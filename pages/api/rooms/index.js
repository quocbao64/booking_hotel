export default async (req, res) => {
    const response = await fetch('http://localhost:3000/rooms')
    const data = await response.json()

    res.status(200).json(data)
}