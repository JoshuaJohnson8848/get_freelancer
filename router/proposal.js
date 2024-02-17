const express = require('express');
const router = express.Router();
const proposalController = require('../controller/proposal');
const isAuth = require('../middleware/isAuth');

router.get('/:id', isAuth, proposalController.getProposalByProjectId);

router.post('', isAuth, proposalController.createProposal);

router.put('/:id', isAuth, proposalController.updateProposal);

router.delete('/:id', isAuth, proposalController.deleteById);

module.exports = router;
