require('dotenv').config();
const db = require('./models');

(async () => {
  try {
    const [result] = await db.sequelize.query(`
      UPDATE works
      SET imageUrl = REPLACE(
        imageUrl,
        'http://localhost:5678',
        'https://sophie-bluel-tdrq.onrender.com'
      )
      WHERE imageUrl LIKE 'http://localhost:5678%';
    `);
    console.log('URLs corrigées dans la base !');
  } catch (e) {
    console.error('Erreur:', e);
  } finally {
    await db.sequelize.close();
    process.exit(0);
  }
})();
