const getDb = require('./database.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'este-es-un-secreto-muy-seguro-cambiar-en-produccion';

exports.handler = async function(event, context) {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const db = await getDb();
        const data = JSON.parse(event.body);
        const { email, password } = data;

        if (!email || !password) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Por favor, ingresa email y contraseña.' })
            };
        }
        
        const sql = `SELECT * FROM users WHERE email = ?`;
        
        // Usamos una Promise para la consulta
        const user = await new Promise((resolve, reject) => {
            db.get(sql, [email], (err, row) => {
                if (err) {
                    reject({ statusCode: 500, message: 'Error en el servidor.' });
                } else {
                    resolve(row);
                }
            });
        });

        if (!user) {
            return {
                statusCode: 401, // 401 Unauthorized es más apropiado aquí
                body: JSON.stringify({ message: 'Usuario no encontrado o contraseña incorrecta.' })
            };
        }
        
        const isPasswordCorrect = bcrypt.compareSync(password, user.password);

        if (!isPasswordCorrect) {
            return {
                statusCode: 401,
                body: JSON.stringify({ message: 'Usuario no encontrado o contraseña incorrecta.' })
            };
        }
        
        const token = jwt.sign(
            { id: user.id, email: user.email, name: user.name },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Inicio de sesión exitoso.',
                token: token,
                user: { id: user.id, name: user.name, email: user.email }
            })
        };

    } catch (error) {
        console.error("Error en la función de login:", error);
        return {
            statusCode: error.statusCode || 500,
            body: JSON.stringify({ message: error.message || 'Error interno del servidor.' })
        };
    }
};