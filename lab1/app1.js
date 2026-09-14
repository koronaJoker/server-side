import http from "http"
import { URL }  from 'url'

const products = [
{ id: 10, name: 'Laptop', category: 'electronics', price: 15000 },
{ id: 15, name: 'Mouse', category: 'electronics', price: 500 },
{ id: 21, name: 'Chair', category: 'furniture', price: 2500 },
{ id: 32, name: 'Table', category: 'furniture', price: 5000 }
];

const server = http.createServer((req,res) => {
    const url = new URL(req.url, `http://${req.headers.host}`)
    const parts = url.pathname.split('/')

    res.setHeader("Content-Type", "application/json")

    if (req.method === "GET" && url.pathname === "/api/products") {

        const category = url.searchParams.get("category")
        const maxPrice = url.searchParams.get("maxPrice")
        
        const filteredProducts = products.filter(product => {
            return (!category || product.category === category) && (
                !maxPrice || product.price <= Number(maxPrice)
            )
        })

        res.end(JSON.stringify(filteredProducts))
        return
    }


    if (req.method ==="GET" &&
        parts[1] === "api"&&
        parts[2] === "products" &&
        parts[3]
    ) {
        const id = Number(parts[3]) 
        const product = products.find((student) => student.id === id)

        if (product) {
            res.end(JSON.stringify(product))
        }
        else {
            res.statusCode = 404
            res.end(JSON.stringify({
                message : "Product not Found"
            }))
        }
        return
    }



})

server.listen(3000, ()=>{
    console.log("Server is running at port 3000")
})