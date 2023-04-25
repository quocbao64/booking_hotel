export default async (req, res) => {
    const {hotelId} = req.query
    const response = await fetch(`http://localhost:3000/hotels/${hotelId}/rooms`)
    const data = await response.json()

    res.status(200).json(data)
}