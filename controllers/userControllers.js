const { db, query } = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


module.exports = {
    register: async (req, res) => {
        const { email, password } = req.body;

    let getEmailQuery = `SELECT * FROM users WHERE email=${db.escape(email)}`;
    let isEmailExist = await query(getEmailQuery);
    if (isEmailExist.length > 0) {
      return res.status(200).send({ message: "Email has been used" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    let addUserQuery = `INSERT INTO users VALUES (null, ${db.escape(email)}, ${db.escape(hashPassword)} )`;
    let addUserResult = await query(addUserQuery);

    return res
      .status(200)
      .send({ data: addUserResult, message: "Register success" });
    },

    login: async (req, res) => {
        console.log('cc')
        try {
          const { email, password } = req.body;
          const isEmailExist = await query(
            `SELECT * FROM users WHERE email=${db.escape(email)}`
          );

          console.log(email, password, isEmailExist)
          if (isEmailExist.length == 0) {
            return res
              .status(200)
              .send({ message: "Email or Password is Invalid", success: false });
          }
          console.log(password, 'cc', isEmailExist[0].password)
          const isValid = await bcrypt.compare(password, isEmailExist[0].password);
    
          if (!isValid) {
            return res
              .status(200)
              .send({ message: "Email or Password is incorrect", success: false });
          }
    
          let payload = {
            id: isEmailExist[0].id_user,
          };
    
          const token = jwt.sign(payload, "joe");

          return res.status(200).send({
            message: "Login Success",
            token,
            data: {
              id: isEmailExist[0].id_user,
              email: isEmailExist[0].email,
            },
            success: true,
          });
        } catch (error) {
          res.status(error.status || 500).send(error);
        }
      },
}