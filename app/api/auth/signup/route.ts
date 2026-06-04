import { withErrorHandling } from "@server/middleware/with-error-handling";
import { withValidation } from "@server/middleware/with-validation";
import { signupRateLimit } from "@server/middleware/rate-limit";
import { successResponse } from "@server/lib/api-response";
import { signup } from "@server/services/auth.service";
import { signupSchema } from "@/lib/validators";

export const POST = signupRateLimit(
  withErrorHandling(
    withValidation(signupSchema, async (_req, { data }) => {
      const user = await signup(data);
      return successResponse(user, 201);
    })
  )
);
