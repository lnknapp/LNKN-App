import { RegionModel } from "../../entities";

export interface AddressModel {
  /**
   *
   * @type {number}
   * @memberof Address
   */
  id: number;
  /**
   *
   * @type {Date}
   * @memberof Address
   */
  createdDate?: Date;
  /**
   *
   * @type {string}
   * @memberof Address
   */
  streetAddress: string;
  /**
   *
   * @type {string}
   * @memberof Address
   */
  streetAddress2?: string | null;
  /**
   *
   * @type {string}
   * @memberof Address
   */
  city: string;
  /**
   *
   * @type {string}
   * @memberof Address
   */
  postalCode: string;
  /**
   *
   * @type {number}
   * @memberof Address
   */
  longitude?: number | null;
  /**
   *
   * @type {number}
   * @memberof Address
   */
  latitude?: number | null;
  /**
   *
   * @type {number}
   * @memberof Address
   */
  regionId: number;
  /**
   *
   * @type {Province}
   * @memberof Address
   */
  region?: RegionModel;
}

export default AddressModel;
