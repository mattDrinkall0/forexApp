-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserStocks" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "stockId" INTEGER NOT NULL,
    "dateAdded" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UserStocks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserStocks_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "Companies" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserStocks" ("id", "stockId", "userId") SELECT "id", "stockId", "userId" FROM "UserStocks";
DROP TABLE "UserStocks";
ALTER TABLE "new_UserStocks" RENAME TO "UserStocks";
CREATE UNIQUE INDEX "UserStocks_userId_stockId_key" ON "UserStocks"("userId", "stockId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
