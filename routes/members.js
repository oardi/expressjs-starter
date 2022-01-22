const express = require('express');
const router = express.Router();

let members = require('../members');

router.get('/', (req, res, next) => {
	res.json(members);
});

router.get('/:id', (req, res) => {
	const member = members.find(m => m.id === +req.params.id);
	res.json(member);
});

router.post('/', (req, res) => {
	const ids = members.map(m => m.id);
	let newMember = {
		id: Math.max(...ids) + 1,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
	};
	members.push(newMember);
	res.json(newMember);
});

router.put('/:id', (req, res) => {
	let toUpdateMember = members.find(m => m.id === +req.params.id);
	if (toUpdateMember) {
		toUpdateMember.firstName = req.body.firstName;
		toUpdateMember.lastName = req.body.lastName;
		res.json(toUpdateMember);
	} else {
		res.json('not found');
	}
});

router.delete('/:id', (req, res) => {
	members = members.filter(m => m.id !== +req.params.id);
	res.json('deleted member with id: ' + req.params.id);
});

module.exports = router;
