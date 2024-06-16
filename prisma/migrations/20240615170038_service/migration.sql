-- CreateTable
CREATE TABLE "Service" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "description" VARCHAR(50) NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);
