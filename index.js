// const express = require('express');
// const mysql = require('mysql2');
// const bodyParser = require('body-parser');
// const path = require('path');

// const app =express();
// const port = 3000;

// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'chr789789',
//   database: 'myapp'
// });
// db.connect((err) => {
//   if (err) {
//     console.error('Database connection failed:', err);
//     return;
//   }
//   console.log('Connected to the database');
// });

// app.use(express.json());
// app.use(express.static(path.join(__dirname, 'public')));

// app.get('/users', (req, res) => {
//   db.query('SELECT * FROM users', (err, results) => {
//     if (err) {
//       console.error('Error fetching users:', err);
//       res.status(500).send('Internal Server Error');
//       return;
//     }
//     res.json(results);
//   });
// });

// app.post('/users', (req, res) => {
//     const{name} = req.body;
//     if (!name) {
//       return res.status(400).send('Name is required');
//     }
//     db.query('INSERT INTO users (name) VALUES (?)', [name], (err, results) => {
//       if (err) {
//         console.error('Error inserting user:', err);
//         res.status(500).send('Internal Server Error');
//         return;
//       }
//       res.status(201).json({ id: results.insertId, name });
//     });
//     });
// app.put('/users/:id', (req, res) => {
//   const id = req.params.id;
//   const { name } = req.body;
//   if (!name) {
//     return res.status(400).send('Name is required');
//   }
//   db.query('UPDATE users SET name = ? WHERE id = ?', [name, id], (err, results) => {
//     if (err) {
//       console.error('Error updating user:', err);
//       res.status(500).send('Internal Server Error');
//       return;
//     }
//     if (results.affectedRows === 0) {
//       return res.status(404).send('User not found');
//     }
//     res.json({ id, name });
//   });
// });

// app.delete('/users/:id', (req, res) => {        
//   const id = req.params.id;
//   db.query('DELETE FROM users WHERE id = ?', [id], (err, results) => {
//     if (err) {
//       return res.status(500).send('Internal Server Error');
//     }
//     if (results.affectedRows === 0) {
//       return res.status(404).send('User not found');
//     }
//     res.status(204).json({message: 'User deleted successfully'});
//   });
// });

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });



const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// 创建 MySQL 数据库连接
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'chr789789',
    database: 'myapp'
});

// 连接数据库
db.connect((err) => {
    if (err) {
        console.error('数据库连接失败:', err);
        return;
    }
    console.log('成功连接到数据库');
});

// 中间件
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 获取所有电影或根据搜索查询过滤
app.get('/movies', (req, res) => {
    const search = req.query.search || '';
    const query = 'SELECT * FROM movies WHERE title LIKE ?';
    db.query(query, [`%${search}%`], (err, results) => {
        if (err) {
            console.error('获取电影失败:', err);
            res.status(500).send('服务器内部错误');
            return;
        }
        res.json(results);
    });
});

// 添加新电影
app.post('/movies', (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).send('电影标题不能为空');
    }
    db.query('INSERT INTO movies (title) VALUES (?)', [title], (err, results) => {
        if (err) {
            console.error('添加电影失败:', err);
            res.status(500).send('服务器内部错误');
            return;
        }
        res.status(201).json({ id: results.insertId, title });
    });
});

// 更新电影
app.put('/movies/:id', (req, res) => {
    const id = req.params.id;
    const { title } = req.body;
    if (!title) {
        return res.status(400).send('电影标题不能为空');
    }
    db.query('UPDATE movies SET title = ? WHERE id = ?', [title, id], (err, results) => {
        if (err) {
            console.error('更新电影失败:', err);
            res.status(500).send('服务器内部错误');
            return;
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('电影未找到');
        }
        res.json({ id, title });
    });
});

// 删除电影
app.delete('/movies/:id', (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM movies WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('删除电影失败:', err);
            res.status(500).send('服务器内部错误');
            return;
        }
        if (results.affectedRows === 0) {
            return res.status(404).send('电影未找到');
        }
        res.status(204).send();
    });
});

// 启动服务器
app.listen(port, () => {
    console.log(`服务器运行在端口 ${port}`);
});