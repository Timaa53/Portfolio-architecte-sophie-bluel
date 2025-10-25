// Backend/fix-urls-mlzc.js
require('dotenv').config();
const db = require('./models');

(async () => {
  try {
    const [result] = await db.sequelize.query(`
      UPDATE works
      SET imageUrl = REPLACE(
        imageUrl,
        'https://sophie-bluel-tdrq.onrender.com/images',
        'https://sophie-bluel-mlzc.onrender.com/images'
      )
    `);

    console.log('URLs mises à jour avec succès ! Résultat SQL:', result);
  } catch (e) {
    console.error('Erreur lors de la mise à jour des URLs:', e);
  } finally {
    await db.sequelize.close();
    process.exit(0);
  }
})();
