/* eslint-disable no-undef */
import express from "express";
import path from "path";
import history from "connect-history-api-fallback";
import cors from "cors";

const app = express();
app.use(history());
const origins = [
  "http://localhost:5003"
  //   process.env.VITE_BRAND_API_URL,
  //   process.env.VITE_AUTH_API_URL,
  //   process.env.VITE_USER_API_URL,
];
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);

app.use("/", express.static(path.join("dist/car_site_admin_dashboard/browser")));

app.use((req, res, next) => {
  const origin = origins.includes(req.header("origin"))
    ? req.headers.origin
    : null;
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  res.setHeader("Access-Control-Allow-Origin", `*`);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH"
  );
  next();
});

let port = 4220;

app.listen(port, () => console.log(`Listening to Port: ${port}`));