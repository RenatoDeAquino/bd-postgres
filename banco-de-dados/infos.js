const Pool = require('pg').Pool
const pool = new Pool({
    user: 'my_user',
    host: 'localhost',
    database: 'my_database',
    password: 'root',
    port:5432,

});


const getInfos = () => {
    return new Promise(function(resolve, reject) {
      pool.query('SELECT * FROM infos ORDER BY id ASC', (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(results.rows);
      })
    }) 
  }
  const createInfos = (body) => {
    return new Promise(function(resolve, reject) {
      const { name, saldo, extrato } = body
      pool.query('INSERT INTO infos (name, saldo, extrato) VALUES ($1, $2, $3) RETURNING *', [name, saldo, extrato], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`A new infos has been added : ${results.rows[0]}`)
      })
    })
  }
  const deleteInfos = () => {
    return new Promise(function(resolve, reject) {
      const id = parseInt(request.params.id)
      pool.query('DELETE FROM infos WHERE id = $1', [id], (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`Merchant deleted with ID: ${id}`)
      })
    })
  }
  
  module.exports = {
    getInfos,
    createInfos,
    deleteInfos,
  }