import { Filter } from "../filter";
import { PaginationRequest } from "../PaginationRequest";

export class RequestFilterDTO extends PaginationRequest {
    filters: Filter[] = new Array<Filter>()
}