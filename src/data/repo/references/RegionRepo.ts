import { ODataResponse, RegionModel } from "../../entities";
import { BaseDataRepository } from "../BaseDataRepository";
export class RegionRepo extends BaseDataRepository<RegionModel>{
  protected baseUrl = "region";

  async getRegionsAsync(oDataQuery: string = ""): Promise<ODataResponse<RegionModel>> {
    const url = `odata/Regions`;
    const response = await this.client.get(url);
    const handledResponse = this.handleResponse<ODataResponse<RegionModel>>(response);
    return handledResponse!;
  }

}
