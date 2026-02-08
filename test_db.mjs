import fs from 'fs';

async function run() {
    try {
        const env = fs.readFileSync('.env', 'utf8');
        const urlMatch = env.match(/VITE_SUPABASE_URL=([^\r\n]+)/);
        const keyMatch = env.match(/VITE_SUPABASE_ANON_KEY=([^\r\n]+)/);
        if (!urlMatch || !keyMatch) { console.error('Supabase env vars missing'); process.exit(1); }
        const url = urlMatch[1].trim();
        const key = keyMatch[1].trim();

        const testTable = async (name) => {
            try {
                const response = await fetch(`${url}/rest/v1/${name}?select=*&limit=1`, {
                    headers: {
                        'apikey': key,
                        'Authorization': 'Bearer ' + key,
                        'Range': '0-0'
                    }
                });
                console.log(`Table ${name}: ${response.status} ${response.statusText}`);
                if (response.status === 200) {
                    const data = await response.json();
                    console.log(`- Sample Data: ${JSON.stringify(data, null, 2)}`);
                }
            } catch (err) {
                console.error(`- Error testing ${name}: ${err.message}`);
            }
        };

        await testTable('creations');
        await testTable('content');
        await testTable('characters');
    } catch (err) {
        console.error('Run error:', err);
    }
}

run();
