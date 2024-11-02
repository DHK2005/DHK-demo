const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const PORT = 3000;

// Cấu hình middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
}));

app.set('view engine', 'ejs');
app.use(express.static('public'));

// Dữ liệu giả lập
const menuItems = [
    { name: 'Cà phê sữa', price: 30000 },
    { name: 'Trà sữa', price: 25000 },
    { name: 'Sinh tố xoài', price: 35000 },
    { name: 'Nước ép cam', price: 20000 },
    { name: 'Trà đào', price: 28000 },
];

app.get('/', (req, res) => {
    res.redirect('/login');
});

// Trang đăng nhập
app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Kiểm tra đăng nhập (sử dụng dữ liệu giả lập)
    if (username === 'admin' && password === '1') {
        req.session.loggedIn = true;
        res.redirect('/menu');
    } else {
        res.send('Đăng nhập thất bại!');
    }
});

// Trang menu
app.get('/menu', (req, res) => {
    if (!req.session.loggedIn) {
        return res.redirect('/login');
    }
    res.render('menu', { menuItems });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
