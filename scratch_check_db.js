const postgres = require('postgres');
const sql = postgres('postgresql://postgres:AV9DiT2jOYqiS9US@db.ccoorrevhclrbykfgpvt.supabase.co:5432/postgres', { ssl: 'require' });

async function check() {
  try {
    const res = await sql`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`;
    console.log('Tables:', res.map(r => r.table_name));
  } catch (err) {
    console.error('DB Error:', err.message);
  } finally {
    process.exit(0);
  }
}
check();
