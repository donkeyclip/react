export interface ContainerParams {
    width: string;
    height: string;
}
export interface Props {
    containerParams: ContainerParams;
}
export interface Definition2 {
    props: Props;
}
export declare type ScriptParams = any;
export interface ClipData {
    id: string;
    name: string;
    uid: string;
    project_branch_id?: any;
    definition: any;
    user_id?: any;
    embed_url: string;
    donkey_url?: any;
    created_at: Date;
    updated_at: Date;
    history: any[];
    embed: string;
}
export interface Meta {
    message: string;
    devMessage: string;
    errorCode: string;
    method: string;
    url: string;
    timestamp: Date;
}
export interface ClipResponse {
    data: ClipData;
    meta: Meta;
}
