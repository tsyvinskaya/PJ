const express = require('express');
const router = express.Router();

const { getUsers, getPagesAmount, getUserById } = require('../model/users');

router.get('/', async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  const limit = parseInt(req.query.limit);
  const page = parseInt(req.query.page);

  if (!limit || !page) {
    return res
      .status(400)
      .json({ message: 'Incorrect limit or page query params' });
  }

  if (limit < 0) {
    return res.status(400).json({ message: 'Limit should be greater than 0' });
  }

  if (page < 0) {
    return res.status(400).json({ message: 'Page should be greater than 0' });
  }

  const pages = await getPagesAmount({ limit });
  const users = await getUsers({ page, limit });

  return res.json({
    pages,
    users,
  });
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  if (Number.isNaN(parseInt(id))) {
    return res.status(400).json({ message: 'Incorrect ID' });
  }

  const user = await getUserById(id);
  return res.json(user);
});

module.exports = router;
