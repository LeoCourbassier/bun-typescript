import { Service } from "typedi";
import { ApplicationService } from "@commons/services";

@Service()
export default class HealthCheckService extends ApplicationService {
    getHealth = (store: Record<string, unknown>) => {
        const log = this.getScoppedLogger(store);
        log.info("Health check");

        return true;
    };
}
