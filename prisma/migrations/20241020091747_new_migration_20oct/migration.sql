-- CreateTable
CREATE TABLE "userAPILimit" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "counter" INTEGER NOT NULL DEFAULT 0,
    "createdDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "userAPILimit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "userAPILimit_userId_key" ON "userAPILimit"("userId");
