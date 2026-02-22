import { ODataResponse } from '../../entities/odata';
import { Page } from '../../entities/pages';
import IODataRepository from '../IODataRepository';

// Stub — OData replaced by Supabase; kept for BaseEntityService compatibility
export class PageODataRepo implements IODataRepository<Page> {
  async query(_oDataQuery: string): Promise<ODataResponse<Page>> {
    return { '@odata.context': '', '@odata.count': 0, value: [] };
  }
}

export default PageODataRepo;
