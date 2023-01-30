import { User } from "./user";

export interface Page {

    content: User[],
    pageable: {
        sort: {
            sorted: boolean,
            unsorted: boolean,
            empty: boolean
        },
        pageSize: number,
        pageNumber: number,
        offset: number,
        unpaged: boolean,
        paged: boolean
    },
    last: boolean,
    totalPages: number,
    totalElements: number,
    sort: {
        sorted: boolean,
        unsorted: boolean,
        empty: boolean
    },
    numberOfElements: number,
    first: boolean,
    number: number,
    size: 10,
    empty: boolean
}
