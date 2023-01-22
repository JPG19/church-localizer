export interface ChurchType {
    id: string;
    name: string;
    address: string;
    schedule: string;
    image: string;
    capacity: number;
    dressProtocol: string;
    healthProtocol: string;
    baptism: boolean;
    firstCommunion: boolean;
    confirmation: boolean;
    wedding: boolean;
    priest: string;
    phone: number;
}