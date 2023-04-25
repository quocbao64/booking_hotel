export default async (req, res) => {
    const response = await fetch('http://localhost:3000/invoices')
    const data = await response.json()

    res.status(200).json(data)
}