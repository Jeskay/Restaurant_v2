-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Dish" (
    "categoryName" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "name" TEXT NOT NULL,

    CONSTRAINT "Dish_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Portion" (
    "id" SERIAL NOT NULL,
    "cost" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "dishName" TEXT NOT NULL,
    "measure" TEXT NOT NULL DEFAULT 'грамм',

    CONSTRAINT "Portion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Dish" ADD CONSTRAINT "Dish_categoryName_fkey" FOREIGN KEY ("categoryName") REFERENCES "Category"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Portion" ADD CONSTRAINT "Portion_dishName_fkey" FOREIGN KEY ("dishName") REFERENCES "Dish"("name") ON DELETE CASCADE ON UPDATE CASCADE;
