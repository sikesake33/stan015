import { Router } from "express";
import prisma from "../prismaClient";
import { z } from "zod";

const router = Router();

const createSchema = z.object({
  title: z.string().min(3),
  description: z.string().optional(),
  address: z.string(),
  city: z.string(),
  images: z.array(z.string()).optional(),
  pricePerDay: z.number().int().nonnegative().optional(),
  pricePerMonth: z.number().int().nonnegative().optional()
});

router.get("/", async (req, res) => {
  const listings = await prisma.listing.findMany({
    where: { isAvailable: true },
    orderBy: { createdAt: "desc" }
  });
  res.json(listings);
});

router.get("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const listing = await prisma.listing.findUnique({ where: { id } });
  if (!listing) return res.status(404).json({ error: "Not found" });
  res.json(listing);
});

router.post("/", async (req, res) => {
  const parsed = createSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.errors });
  const listing = await prisma.listing.create({ data: parsed.data });
  res.status(201).json(listing);
});

export default router;
