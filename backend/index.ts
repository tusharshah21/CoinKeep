import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const app = express();

app.set("trust proxy", 1);

const publicCors = cors({
  origin: "*", // all origins allowed
  credentials: false,
  optionsSuccessStatus: 200,
  allowedHeaders: ["x-auth-user", "content-type", "Authorization", "x-api-key"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH", "HEAD"],
});

const whitelist = [
  "http://127.0.0.1:3000",
  "http://127.0.0.1:3001",
  "http://localhost:3000",
  "http://localhost:3001",
  "http://127.0.0.1:3002",
  "http://localhost:3002",
  "http://127.0.0.1:4000",
  "http://localhost:4000",
  "http://localhost:8080",
  "http://127.0.0.1:8080",
];

const corsOptions: cors.CorsOptions = {
  origin: function (
    origin: string | undefined,
    callback: (error: Error | null, allow?: boolean) => void
  ) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error(`Not allowed by CORS for origin: ${origin}`));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
  allowedHeaders: ["x-auth-user", "content-type", "Authorization", "x-api-key"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH", "HEAD"],
};

const restrictedCors = cors(corsOptions);

app.use(bodyParser.json());

app.use(express.json());

// public apis

app.get("/v1/health", (req, res) => {
  res.status(200).json({ message: "OK" });
});

const PORT = process.env.PORT || 3000;

let server: any;

const startServer = async () => {
  try {
    server = app.listen(PORT, () => {
      console.log(
        `Server is running on port ${PORT} in ${process.env.NODE_ENV} mode`
      );
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

// Start the server
startServer();

// handle graceful shutdown
const gracefulShutdown = async () => {
  console.log("Received shutdown signal, closing server and worker...");

  server.close(async () => {
    console.log("Server closed");
    try {
      process.exit(0);
    } catch (error) {
      console.error("Error during shutdown:", error);
      process.exit(1);
    }
  });

  // Force close after 10 seconds
  setTimeout(() => {
    console.error(
      "Could not close connections in time, forcefully shutting down"
    );
    process.exit(1);
  }, 10000);
};

// Listen for termination signals
process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  gracefulShutdown();
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  gracefulShutdown();
});
