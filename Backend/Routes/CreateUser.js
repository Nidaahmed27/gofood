const express = require('express');
const router = express.Router();
const User = require("../Models/User");
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtsecret = "jwtSecretIsASecureString!";
router.post("/createUser", [
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    body('name').isLength({ min: 5 })
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const salt = await bcrypt.genSalt(10);
        let secPassword = await bcrypt.hash(req.body.password, salt)
        try {
            await User.create({
                name: req.body.name,
                location: req.body.location,
                email: req.body.email,
                password: secPassword
            });

            res.json({ success: true });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, error: "Internal Server Error" });
        }
    });

router.post("/loginUser", [
    body('email').isEmail(),
    body('password').isLength({ min: 5 })],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const userdata = await User.findOne({
                email: req.body.email,
            });
            if (!userdata) {
                return res.status(400).json({ errors: "try login with correct credentials" });
            }

            const pwdcompare = await bcrypt.compare(req.body.password, userdata.password)

            if (!pwdcompare) {
                return res.status(400).json({ errors: "try login with correct credentials" });

            }
            const data = {
                user: {
                    id: userdata.id
                }
            }
            const authtoken = jwt.sign(data, jwtsecret);
            return res.json({ success: true, authtoken: authtoken });


        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, error: "Internal Server Error" });
        }
    });

module.exports = router;
