const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
const PORT = 8080;

// Creat a connection pool
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crud_contact'
});

app.use(cors());
app.use(express.json()); // <==== parse request body as JSON
app.use(bodyParser.urlencoded({ extended: true }));

// Use the connection pool to execute a query
app.get('/api/get', (req, res) => {
    const sqlRead = "SELECT * FROM `contact_db`";

    db.query(sqlRead, (err, results) => {
        if (err) throw err;
        res.send(results);
    })
});
app.get('/api/get/:id', (req, res) => {
    const { id } = req.params;
    const sqlReadById = "SELECT * FROM contact_db WHERE id=?";
    db.query(sqlReadById, id, (error, results) => {
        if (error) throw error;
        res.send(results);
    })

});

app.post('/api/post', (req, res) => {
    const { name, email, phone } = req.body;
    const sqlInsert = "INSERT INTO contact_db (name,email,phone) VALUES (?,?,?)";
    db.query(sqlInsert, [name, email, phone], (error, results) => {
        if (error) throw error;
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    });
})

app.delete('/api/remove/:id', (req, res) => {
    const { id } = req.params;
    const sqlRemove = "DELETE FROM contact_db WHERE id=?";
    db.query(sqlRemove, id, (error, results) => {
        if (error) throw error;
    });
})

app.put('/api/update/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    const sqlUpdate = "UPDATE contact_db SET name=?,email=?,phone=? WHERE id=?";
    db.query(sqlUpdate, [name, email, phone, id], (error, results) => {
        if (error) throw error;
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    });
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})