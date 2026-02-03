import { authorizeAntigravity } from 'file:///C:/Users/gauvi/AppData/Roaming/npm/node_modules/opencode-antigravity-auth/dist/src/antigravity/oauth.js';

async function test() {
    try {
        console.log("Calling authorizeAntigravity...");
        const result = await authorizeAntigravity("test-project");
        console.log("Result:", result);
    } catch (error) {
        console.error("Error detected:", error);
        if (error.stack) {
            console.error("Stack trace:", error.stack);
        }
    }
}

test();
