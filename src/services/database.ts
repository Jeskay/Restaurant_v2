import { Prisma, PrismaClient } from "@prisma/client";
import { DishDto } from "../dto/dish";

export class DatabaseService {
    private prisma: PrismaClient = new PrismaClient();
    
    //categories

    public getCategories = async () => await this.prisma.category.findMany();

    public createCategory = async (name: string) => await this.prisma.category.create({
        data: {
            name
        }
    });

    public deleteCategory = async (name: string) => await this.prisma.category.delete({
        where: {
            name
        }
    });

    //dishes

    public getDishes = async (categoryName: string) => await this.prisma.dish.findMany({
        where:{
            categoryName
        },
        include: {
            portions: true
        }
    });

    public getDish = async (name: string) => await this.prisma.dish.findFirst({
        where: {
            name
        },
        include: {
            portions: true
        }
    });

    public createDish = async (dish: Prisma.DishCreateInput) => await this.prisma.dish.create({
        data: dish
    });

    public updateDish = async (name: string, dish: Prisma.DishUncheckedUpdateInput) => await this.prisma.dish.update({
        where: {
            name
        },
        data: dish
    });

    public deleteDish = async (name: string) => await this.prisma.dish.delete({
        where: {
            name
        }
    });

    //portions

    public getPortions = async () => await this.prisma.portion.findMany();

    public getPortionsByDish = async (dishName: string) => await this.prisma.portion.findMany({
        where: {
            dishName
        }
    });

    public async createPortions(portions: Prisma.PortionUncheckedCreateInput[]) {
        await this.prisma.portion.deleteMany({
            where: {
                dishName: {
                    in: portions.map( p => p.dishName)
                }
            }
        });
        return await this.prisma.portion.createMany({
            data: portions
        });
    }

    public deletePortion = async (id: number) => await this.prisma.portion.delete({
        where: {
            id
        }
    });

    //user
    
    public createUser = async (user: Prisma.UserCreateInput) => await this.prisma.user.create({
        data: user
    });
    

    public getUser = async (email: string) => await this.prisma.user.findUnique({
        where: {
            email
        }
    });
}