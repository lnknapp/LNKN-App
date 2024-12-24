export interface ODataResponse<TEntity = object> {
  "@odata.context": string,
  "@odata.count": number,
  "value": TEntity[]
}

export type ODataSingleResponse<TEntity extends {}> = TEntity & {
  "@odata.context": string,
}

export default ODataResponse;
