"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
const kysely_1 = require("kysely");
async function up(db) {
    await (0, kysely_1.sql) `
    CREATE OR REPLACE FUNCTION public.insert_profile()
    RETURNS trigger AS $$
    BEGIN
      INSERT INTO public.users (user_id,email)
      VALUES (
        NEW.id,
        NEW.email
      );
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql security definer;
  `.execute(db);
    await (0, kysely_1.sql) `
    CREATE TRIGGER users_insert_trigger
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.insert_profile();
  `.execute(db);
}
async function down(db) {
    await (0, kysely_1.sql) `
  DROP TRIGGER IF EXISTS users_insert_trigger ON auth.users;
`.execute(db);
    await (0, kysely_1.sql) `
  DROP FUNCTION IF EXISTS public.insert_profile;
`.execute(db);
}
//# sourceMappingURL=20241001233136_users_trigger.js.map