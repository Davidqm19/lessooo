const getDb = require('./database.js');
const bcrypt = require('bcryptjs');

exports.handler = async function(event, context) {
    // Solo permitir peticiones POST
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const db = await getDb();
        const data = JSON.parse(event.body);
        const { name, email, password } = data;

        if (!name || !email || !password) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Por favor, completa todos los campos.' })
            };
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const sql = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
        
        // Usamos una Promise para manejar la operación asíncrona de la base de datos
        await new Promise((resolve, reject) => {
            db.run(sql, [name, email, hashedPassword], function(err) {
                if (err) {
                    if (err.message.includes('UNIQUE constraint failed')) {
                        reject({ statusCode: 409, message: 'El correo electrónico ya está registrado.' });
                    } else {
                        reject({ statusCode: 500, message: 'Error al registrar el usuario.', error: err.message });
                    }
                } else {
                    resolve({ userId: this.lastID });
                }
            });
        });

        return {
            statusCode: 201,
            body: JSON.stringify({ message: 'Usuario registrado con éxito.' })
        };

    } catch (error) {
        console.error("Error en la función de registro:", error);
        return {
            statusCode: error.statusCode || 500,
            body: JSON.stringify({ message: error.message || 'Error interno del servidor.' })
        };
    }
};