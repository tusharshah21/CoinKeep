import { z } from "zod";
import { APIError } from "../helpers/error";

const createPaymentOrderSchema = z.object({
  payer: z.string().length(42),
  receivers: z.array(
    z.object({
      address: z.string().length(42),
      chainId: z.number(),
      token: z.string().length(42),
      amount: z.bigint(),
    })
  ),
});

export const createPaymentOrder = (req: any, res: any) => {
  try {
    const result = createPaymentOrderSchema.safeParse(req.query);
    if (!result.success) {
      console.log(result.error.message);
      throw new APIError("BAD_REQUEST", {
        message: "Invalid Parameters",
        reason: JSON.parse(result.error.message).map((msg) => {
          return msg.message;
        }),
      });
    }

    const { payer, receivers } = result.data;

    
  } catch (error) {
    if (error.name === "APIError") {
      return res.status(error.statusCode).json(error.body);
    }

    return res.status(500).json({
      code: "INTERNAL_SERVER_ERROR",
      message: "Internal Server Error",
    });
  }
};
