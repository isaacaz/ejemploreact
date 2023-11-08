
export interface IUser {
    id?: string;
    name: string;
    lastName: string;
    age: number;
    gender: IGender;
    email: string;
    password: string;
}


type IGender = "Male" | "Female" | "Other"