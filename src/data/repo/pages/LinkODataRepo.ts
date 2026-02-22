import { ODataResponse } from '../../entities/odata';
import { Link } from '../../entities/pages';
import IODataRepository from '../IODataRepository';

// Stub — OData replaced by Supabase; kept for BaseEntityService compatibility
export class LinkODataRepo implements IODataRepository<Link> {
  async query(_oDataQuery: string): Promise<ODataResponse<Link>> {
    return { '@odata.context': '', '@odata.count': 0, value: [] };
  }
}

export default LinkODataRepo;
