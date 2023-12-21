import { Service } from "typedi";
import { ApplicationService } from "@common/services";
import { Logger } from "@bogeychan/elysia-logger/types";
import { Loggeable } from "@common/loggeable";
import { ApplicationContext } from "@common/context";

@Service()
@Loggeable()
export default class HealthCheckService extends ApplicationService {
    getHealth(_ctx: ApplicationContext, logger?: Logger): boolean {
        logger!.info("Health check");

        return true;
    }
}
