import { LogModel, ODataResponse } from "../../entities";
import { BaseRepository } from "../BaseRepository";

export class LogRepo extends BaseRepository {

  async getEventLogsOData(oDataQuery: string = ""): Promise<ODataResponse<LogModel>> {
    const url = `/OData/EventLogs/?$count=true&${oDataQuery}`;

    const response = await this.client.get(url);
    return this.handleResponse(response)!;
  }
}

export default LogRepo;
