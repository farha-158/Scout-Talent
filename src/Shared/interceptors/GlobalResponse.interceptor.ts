import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { map, Observable } from "rxjs";

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((data) => {
        if (!data || response.headersSent) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-return
          return data;
        }

        return {
          success: true,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          data: data?.data ?? data ?? null,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          meta: data?.meta ?? null,
        };
      }),
    );
  }
}