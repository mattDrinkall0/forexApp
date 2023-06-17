-- CreateTable
CREATE TABLE "UserStocks" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "stockId" INTEGER NOT NULL,
    CONSTRAINT "UserStocks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserStocks_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "Companies" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "UserStocks_userId_stockId_key" ON "UserStocks"("userId", "stockId");
