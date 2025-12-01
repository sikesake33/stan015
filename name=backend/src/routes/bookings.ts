import { Router } from "express";
import prisma from "../prismaClient";
import { z } from "zod";

const router = Router();

const createBookingSchema = z.object({
  listingId: z.number().int(),
  startDate: z.string(), // ISO
  endDate: z.string(),
  rentType: z.enum(["DAILY", "MONTHLY"]),
  totalAmount: z.number().int(),
  paymentMethod: z.enum(["CASH", "BANK_TRANSFER", "OTHER"]),
  customerName: z.string().min(1),
  customerPhone: z.string().min(4)
});

router.post("/", async (req, res) => {
  const parsed = createBookingSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.errors });

  // Basic availability check for overlapping bookings
  const { listingId } = parsed.data;
  const overlapping = await prisma.booking.findFirst({
    where: {
      listingId,
      AND: [
        { startDate: { lte: new Date(parsed.data.endDate) } },
        { endDate: { gte: new Date(parsed.data.startDate) } }
      ]
    }
  });
  if (overlapping) return res.status(400).json({ error: "Listing already booked for that period" });

  const booking = await prisma.booking.create({ data: parsed.data });
  res.status(201).json(booking);
});

router.get("/listing/:listingId", async (req, res) => {
  const listingId = Number(req.params.listingId);
  const bookings = await prisma.booking.findMany({ where: { listingId } });
  res.json(bookings);
});

export default router;
