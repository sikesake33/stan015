import express from "express";
import cors from "cors";
import listingsRouter from "./routes/listings";
import bookingsRouter from "./routes/bookings";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/listings", listingsRouter);
app.use("/api/bookings", bookingsRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
