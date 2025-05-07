-- CreateTable
CREATE TABLE "PostmarkSetting" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "apiToken" TEXT NOT NULL,
    "fromEmail" TEXT NOT NULL,
    "replyToEmail" TEXT,
    "messageStream" TEXT NOT NULL DEFAULT 'outbound',
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
