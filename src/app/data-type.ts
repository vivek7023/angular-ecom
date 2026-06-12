export interface SingUp{
    name:string,
    password:string,
    email:string
}

export interface sellerLogin{
    email:string,
    password:string
}

export interface productType{
    pname:string,
    pprice:number,
    pcategory:string,
    pcolor:string,
    pdescription:string,
    pimageurl:string,
    id:string
}

export interface userType{
    name:string,
    email:string,
    password:string,
    address:string,
    phone:string,
    id:string
}

export interface cartType {
    pname: string;
    pprice: number;
    pcategory: string;
    pcolor: string;
    pdescription: string;
    pimageurl: string;
    id?: string;
    productId: string;
    userId: string;
    quantity?: number;
}