import { pgTable, text,timestamp,uuid, vector} from "drizzle-orm/pg-core";
import { rooms } from "./rooms.ts";

export const audioChunks = pgTable('questions', {
  id: uuid().primaryKey().defaultRandom(),
  roomId: uuid()
    .references(() => rooms.id)
    .notNull(),
  question: text().notNull(),
  transcription: text().notNull(),
  embeddings:vector({dimensions:768}).notNull(), //representacao semantica
  createdAt: timestamp().defaultNow().notNull(),
})

