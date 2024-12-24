import { BaseEntityService } from "../BaseEntityService";
import { ODataResponse, RegionModel } from "../../data/entities";
import { RegionRepo, RegionODataRepo } from "../../data/repo";

export class RegionService extends BaseEntityService<RegionModel, RegionRepo, RegionODataRepo> {

  constructor(){
    super(new RegionRepo(), new RegionODataRepo());
  }

  async getRegionsAsync(oDataQuery: string = ""): Promise<ODataResponse<RegionModel>> {
    return await new RegionRepo().getRegionsAsync(oDataQuery);
  }

}

export default RegionService;
