const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const app = express();
const database = new sqlite3.Database('./dbHURB.db') //nova instância para pegar o banco de dados
const urlencodedParser = bodyParser.urlencoded({ extended: true });
const port = process.env.PORT || 3000;
const hostname = '127.0.0.1';
const DBPATH = 'dbHURB.db';
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("./"));

// Adicionar um parceiro com seu nome e montante total(que vai ser calculado automaticamente e não manualmente, e atualizado em tempo real)
app.post('/createpartner', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
	sql = "INSERT INTO PARCEIRO (nome, montante) VALUES ('" + req.body.nome + "', '" + req.body.montante + "')";
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
	});
	db.close(); // Fecha o banco
	res.end();
});


app.post('/register', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
	sql = "INSERT INTO ANTECIPACAO (montanteEscolhido, regraNegocio, parceiroId, discountedAnticipation) VALUES ('" + req.body.montanteEscolhido + "', '" + req.body.regraNegocio + "', '" + req.body.parceiroId +  "', '" + req.body.discountedAnticipation + "')";
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.all(sql, [],  err => {
		if (err) {
		    res.send(err);
		}
	});
	db.close(); // Fecha o banco
	res.end();
});

app.get('/anticipations', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
	var db = new sqlite3.Database(DBPATH); // Abre o banco
  var sql = 'SELECT * FROM ANTECIPACAO ORDER BY id DESC LIMIT 1';
	db.all(sql, [],  (err, rows ) => {
		if (err) {
		    throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
});

app.get('/users', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
	var db = new sqlite3.Database(DBPATH); // Abre o banco
  var sql = 'SELECT * FROM CONTA ORDER BY login COLLATE NOCASE';
	db.all(sql, [],  (err, rows ) => {
		if (err) {
		    throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
});


app.get('/feedback', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
	var db = new sqlite3.Database(DBPATH); // Abre o banco
  var sql = 'SELECT * FROM ANTECIPACAO ORDER BY id DESC LIMIT 1';
	db.all(sql, [],  (err, rows ) => {
		if (err) {
		    throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
});

app.get('/get-ds', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
	var db = new sqlite3.Database(DBPATH); // Abre o banco
  var sql = 'SELECT regraNegocio FROM ANTECIPACAO DESC LIMIT 99';
	db.all(sql, [],  (err, rows ) => {
		if (err) {
		    throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
});

app.get('/get-partners', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
	var db = new sqlite3.Database(DBPATH); // Abre o banco
  var sql = 'SELECT * FROM PARCEIRO';
	db.all(sql, [],  (err, rows ) => {
		if (err) {
		    throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
}); 

app.post('/update-amount', urlencodedParser, (req, res) => {
	res.statusCode = 200;	
	//res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
	sql = "UPDATE PARCEIRO SET montante = '" + req.body.montante + "' WHERE id = " + req.body.id;
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	db.close(); // Fecha o banco
});

app.get('/get-access', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
	var db = new sqlite3.Database(DBPATH); // Abre o banco
  var sql = 'SELECT * FROM ACESSO ORDER BY id DESC LIMIT 1';
	db.all(sql, [],  (err, rows ) => {
		if (err) {
		    throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
});

app.get('/get-reserves', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
	var db = new sqlite3.Database(DBPATH); // Abre o banco
  	var sql = 'SELECT * FROM RESERVA ORDER BY id DESC';
	db.all(sql, [],  (err, rows ) => {
		if (err) {
		    throw err;
		}
		res.json(rows);
	});
	db.close(); // Fecha o banco
});

app.post('/save-new-partner', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
	sql = "INSERT INTO CONTA (login, senha, email, parceiro_id) VALUES ('" + req.body.login + "', '" + req.body.senha + "', '" + req.body.email + "' , '" + req.body.parceiro_id + "')";
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
	});
	db.close(); // Fecha o banco
	res.end();
});

app.post('/new-access', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
	sql = "INSERT INTO ACESSO (login_parceiro) VALUES ('" + req.body.login_parceiro + "')";
	console.log(sql);
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.all(sql, [],  err => {
		if (err) {
		    res.send(err);
		}
	});
	db.close(); // Fecha o banco
	res.end();
});

app.listen(port, hostname, () => {
    console.log(`BD server running at http://${hostname}:${port}/`);
  });