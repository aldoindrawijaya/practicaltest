const {db ,query} = require("../database")

module.exports = {
    fetchAllProduct: async (req,res) => {
        try{
            const product = await query (`SELECT * FROM produk`)
            return res.status(200).send(product)
        }catch (error ){
            console.log ( error)
            res.status(error.status || 500).send(error)
        }
    },

    fetchProduct: async (req,res) => {

        console.log(req.params)
        const id_produk = req.params.id

        try{
            const product = await query (`SELECT * FROM produk WHERE id_produk = ${id_produk}`)
            return res.status(200).send(product[0])
        }catch (error ){
            console.log ( error)
            res.status(error.status || 500).send(error)
        }
    },

    deleteProduct : async (req,res) => {
        const {id_produk} = req.body
        
        try {
            await query(`DELETE FROM produk WHERE id_produk = ${id_produk}`)
            return res.status(200).send({message: "Delete Success"})
        
        } catch (error) {
            console.log(error)
            res.status(error.status || 200).send(error)
        }
    },
    addProduct: async (req,res) => {
        
        const { foto_barang, nama_produk, harga_beli , harga_jual, stok} = req.body
        let getSameProduct = `SELECT * FROM produk WHERE nama_produk=${db.escape(nama_produk)}`
        let ProductExist = await query (getSameProduct)
        if (ProductExist.length > 0) {
            return res.status(200).send ({message: "product already inputed"})
            
        } else {
            let addContent = `INSERT INTO produk VALUES (null, ${db.escape(foto_barang)}, ${db.escape(nama_produk)}, ${db.escape(harga_beli)}, ${db.escape(harga_jual)},${db.escape(stok)} )`

            let addProduct = await query (addContent)

            return res.status(200).send({data: addProduct, message: "Content has been created"})
        }
    },

    updateProduct: async (req,res) => {
        console.log(req.body)
        
        const { foto_barang, nama_produk, harga_beli , harga_jual, stok, id_produk} = req.body

        let update = `UPDATE produk `
        let set = `SET`
        let where = ` WHERE id_produk=${db.escape(id_produk)}`
        if (foto_barang){
            set += ` foto_barang = ${db.escape(foto_barang)}`
        }
        if (nama_produk){
            set += ` nama_produk = ${db.escape(nama_produk)}`
        }
        if (harga_beli){
            set += ` harga_beli = ${db.escape(harga_beli)}`
        }
        if (harga_jual){
            set += ` harga_jual = ${db.escape(harga_jual)}`
        }
        if (stok){
            set += ` stok = ${db.escape(stok)}`
        }

        let querya = update + set + where

        let updateProduct = `UPDATE produk SET foto_barang = ${db.escape(foto_barang)}, nama_produk = ${db.escape(nama_produk)},  harga_beli = ${db.escape(harga_beli)}, harga_jual = ${db.escape(harga_jual)}, stok = ${db.escape(stok)} WHERE id_produk=${db.escape(id_produk)}`
        
        let response = await query(updateProduct)

        return res.status(200).send({data: response, message: "Content has been Updated"})
        },

        
    }