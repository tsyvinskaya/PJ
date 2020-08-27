export interface UsersStat {
    data: [{
        user_id:number;
        date:Date;
        page_views:number;
        clicks: number
    }];
}