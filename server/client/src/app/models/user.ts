export interface User{
    _id: string,
    username: string,
    email: string,
    password: string,
    mobile: string
    address: string
    myProducts: Array<string>,
    wishlist: Array<string>
}