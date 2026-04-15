-- DropForeignKey
ALTER TABLE "Deal" DROP CONSTRAINT "Deal_gearId_fkey";

-- AlterTable
ALTER TABLE "Deal" ADD COLUMN     "description" TEXT,
ADD COLUMN     "title" TEXT,
ALTER COLUMN "gearId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "GearItem" ADD COLUMN     "award" TEXT,
ADD COLUMN     "imageUrls" JSONB DEFAULT '[]',
ADD COLUMN     "whereToBuy" JSONB DEFAULT '[]';

-- AlterTable
ALTER TABLE "UpgradeEdge" ADD COLUMN     "path" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- CreateTable
CREATE TABLE "GearRequest" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GearRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "GearRequest_userId_idx" ON "GearRequest"("userId");

-- CreateIndex
CREATE INDEX "GearRequest_status_idx" ON "GearRequest"("status");

-- CreateIndex
CREATE INDEX "Deal_gearId_idx" ON "Deal"("gearId");

-- CreateIndex
CREATE INDEX "Deal_isActive_foundAt_idx" ON "Deal"("isActive", "foundAt");

-- CreateIndex
CREATE INDEX "Follow_followerId_idx" ON "Follow"("followerId");

-- CreateIndex
CREATE INDEX "Follow_followingId_idx" ON "Follow"("followingId");

-- CreateIndex
CREATE INDEX "GearItem_categoryId_idx" ON "GearItem"("categoryId");

-- CreateIndex
CREATE INDEX "GearItem_brand_idx" ON "GearItem"("brand");

-- CreateIndex
CREATE INDEX "Loadout_userId_isActive_idx" ON "Loadout"("userId", "isActive");

-- CreateIndex
CREATE INDEX "LoadoutItem_loadoutId_idx" ON "LoadoutItem"("loadoutId");

-- CreateIndex
CREATE INDEX "Review_gearId_idx" ON "Review"("gearId");

-- CreateIndex
CREATE INDEX "UserGear_userId_idx" ON "UserGear"("userId");

-- CreateIndex
CREATE INDEX "WatchlistItem_userId_idx" ON "WatchlistItem"("userId");

-- AddForeignKey
ALTER TABLE "Deal" ADD CONSTRAINT "Deal_gearId_fkey" FOREIGN KEY ("gearId") REFERENCES "GearItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GearRequest" ADD CONSTRAINT "GearRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
