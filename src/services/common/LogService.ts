import { LogModel, ODataResponse } from "../../data/entities";
import { LogRepo } from "../../data/repo";
export class LogService {

  async getEventLogsOData(oDataQuery: string = ""): Promise<ODataResponse<LogModel>> {
    const response = await new LogRepo().getEventLogsOData(oDataQuery);
    return response;

  }
}

export default LogService;
