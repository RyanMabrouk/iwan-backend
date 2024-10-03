import { Kysely, sql } from 'kysely';

export async function up(db: Kysely<unknown>) {
  await sql`
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

  await sql`
    CREATE TRIGGER users_insert_trigger
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.insert_profile();
  `.execute(db);
}

export async function down(db: Kysely<unknown>) {
  await sql`
  DROP TRIGGER IF EXISTS users_insert_trigger ON auth.users;
`.execute(db);

  await sql`
  DROP FUNCTION IF EXISTS public.insert_profile;
`.execute(db);
}
