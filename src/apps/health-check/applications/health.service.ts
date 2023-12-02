import { Service } from "typedi";
import { ApplicationService } from "common/services";
import { Store } from "common/context";

@Service()
export default class HealthCheckService extends ApplicationService {
    getHealth(store: Store) {
        const log = this.logger(store);
        log.info("Health check");

        return true;
    }
}
