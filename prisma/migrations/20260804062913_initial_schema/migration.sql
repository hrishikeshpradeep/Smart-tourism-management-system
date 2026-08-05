-- CreateEnum
CREATE TYPE "Role" AS ENUM ('TOURIST', 'ADMIN');

-- CreateEnum
CREATE TYPE "ContentStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "TripStatus" AS ENUM ('DRAFT', 'PLANNED', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "BudgetCategory" AS ENUM ('TRANSPORT', 'STAY', 'FOOD', 'ACTIVITY', 'OTHER');

-- CreateEnum
CREATE TYPE "ReviewStatus" AS ENUM ('PENDING', 'APPROVED', 'HIDDEN');

-- CreateEnum
CREATE TYPE "ProviderType" AS ENUM ('HOTEL', 'GUIDE');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'REJECTED', 'CANCELLED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'TOURIST',
    "phone" TEXT,
    "preferencesJson" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Destination" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "dailyCost" DECIMAL(10,2) NOT NULL,
    "rating" DECIMAL(2,1) NOT NULL DEFAULT 0,
    "bestSeason" TEXT NOT NULL,
    "imageUrl" TEXT,
    "latitude" DECIMAL(9,6),
    "longitude" DECIMAL(9,6),
    "status" "ContentStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Destination_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attraction" (
    "id" TEXT NOT NULL,
    "destinationId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "entryFee" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "durationMin" INTEGER,
    "openingHours" TEXT,
    "status" "ContentStatus" NOT NULL DEFAULT 'PUBLISHED',

    CONSTRAINT "Attraction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trip" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "destinationId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "startDate" DATE NOT NULL,
    "endDate" DATE NOT NULL,
    "travelers" INTEGER NOT NULL DEFAULT 1,
    "budget" DECIMAL(10,2) NOT NULL,
    "travelStyle" TEXT,
    "status" "TripStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItineraryDay" (
    "id" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "dayDate" DATE NOT NULL,
    "dayNumber" INTEGER NOT NULL,
    "notes" TEXT,

    CONSTRAINT "ItineraryDay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItineraryItem" (
    "id" TEXT NOT NULL,
    "itineraryDayId" TEXT NOT NULL,
    "attractionId" TEXT,
    "title" TEXT NOT NULL,
    "startTime" TEXT,
    "durationMin" INTEGER,
    "sequence" INTEGER NOT NULL,
    "estimatedCost" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "notes" TEXT,

    CONSTRAINT "ItineraryItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BudgetItem" (
    "id" TEXT NOT NULL,
    "tripId" TEXT NOT NULL,
    "category" "BudgetCategory" NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "source" TEXT,
    "isOverride" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "BudgetItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wishlist" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "destinationId" TEXT,
    "attractionId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Wishlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "destinationId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "body" TEXT NOT NULL,
    "status" "ReviewStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookingRequest" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "tripId" TEXT,
    "providerType" "ProviderType" NOT NULL,
    "providerName" TEXT NOT NULL,
    "startDate" DATE NOT NULL,
    "endDate" DATE NOT NULL,
    "guests" INTEGER NOT NULL,
    "note" TEXT,
    "status" "BookingStatus" NOT NULL DEFAULT 'PENDING',
    "adminNote" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BookingRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Destination_slug_key" ON "Destination"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ItineraryDay_tripId_dayNumber_key" ON "ItineraryDay"("tripId", "dayNumber");

-- CreateIndex
CREATE UNIQUE INDEX "ItineraryItem_itineraryDayId_sequence_key" ON "ItineraryItem"("itineraryDayId", "sequence");

-- CreateIndex
CREATE UNIQUE INDEX "Wishlist_userId_destinationId_key" ON "Wishlist"("userId", "destinationId");

-- CreateIndex
CREATE UNIQUE INDEX "Wishlist_userId_attractionId_key" ON "Wishlist"("userId", "attractionId");

-- CreateIndex
CREATE UNIQUE INDEX "Review_userId_destinationId_key" ON "Review"("userId", "destinationId");

-- AddForeignKey
ALTER TABLE "Attraction" ADD CONSTRAINT "Attraction_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItineraryDay" ADD CONSTRAINT "ItineraryDay_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItineraryItem" ADD CONSTRAINT "ItineraryItem_itineraryDayId_fkey" FOREIGN KEY ("itineraryDayId") REFERENCES "ItineraryDay"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItineraryItem" ADD CONSTRAINT "ItineraryItem_attractionId_fkey" FOREIGN KEY ("attractionId") REFERENCES "Attraction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BudgetItem" ADD CONSTRAINT "BudgetItem_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wishlist" ADD CONSTRAINT "Wishlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wishlist" ADD CONSTRAINT "Wishlist_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wishlist" ADD CONSTRAINT "Wishlist_attractionId_fkey" FOREIGN KEY ("attractionId") REFERENCES "Attraction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingRequest" ADD CONSTRAINT "BookingRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingRequest" ADD CONSTRAINT "BookingRequest_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("id") ON DELETE SET NULL ON UPDATE CASCADE;
