export abstract class Dish {
    protected id: string;
    protected name: string;
    protected description: string;
    protected real_price: number; 



    getId(): string {
        return this.id;
    }
    getRealPrice(): number {
        return this.real_price;
    }
    getName(): string {
        return this.name;
    }
    getDescription(): string {
        return this.getDescription();
    }
}