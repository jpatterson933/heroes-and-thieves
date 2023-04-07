import express from "express";
import prisma from "../prisma";


const router = express.Router();

router.get("/heroes", async (req, res) => {
    try {
        const heroes = await prisma.hero.findMany({});
        res.json(heroes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'internal server error' })
    }
})

export default router;