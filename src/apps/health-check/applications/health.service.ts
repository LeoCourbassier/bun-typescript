import { Service } from "typedi";
import { ApplicationService } from "@commons/services";
import { Store } from "@commons/context";

@Service()
export default class HealthCheckService extends ApplicationService {
    getHealth = (store: Store) => {
        const log = this.getScoppedLogger(store);
        log.info("Health check");

        return true;
    };
}
