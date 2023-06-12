-- CreateTable
CREATE TABLE "Companies" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "symbol" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Companies_symbol_key" ON "Companies"("symbol");
