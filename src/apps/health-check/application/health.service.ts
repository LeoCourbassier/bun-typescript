import { Service } from "typedi";
import { HealthResponses } from "../adapters/http/views/response/health.responses";
import { ApplicationService } from "@commons/services";

@Service()
export default class HealthCheckService extends ApplicationService<HealthCheckService> {
    getHealth = () => {
        return HealthResponses.GetHealth.Success();
    };
}
