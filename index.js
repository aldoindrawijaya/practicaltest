const express =require('express')
const PORT = 8000;
const app = express()
const cors =require("cors")
const {db,query} = require("./database")
const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")
const upload = require("./middleware/multer");

app.use(cors())
app.use(express.json())
app.use(express.static("public"));

app.post("/upload", upload.single("file"), async (req, res) => {
    const { file } = req;
    const filepath = file ? "/" + file.filename : null;
    console.log(filepath)

  
    let data = JSON.parse(req.body.data);
  
    let response = await query(
      `UPDATE produk SET foto_barang = ${db.escape(
        filepath
      )} WHERE id_produk = ${db.escape(data.id)}`
    );
    console.log(response);
  
    res.status(200).send({ filepath });
  });

app.use("/auth", authRoutes)
app.use("/user", userRoutes)


app.listen(PORT, () => {
    console.log("server is running on port: " + PORT)
})