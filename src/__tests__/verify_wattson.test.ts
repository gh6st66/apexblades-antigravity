// verify_wattson.test.ts
// Jest test that runs the verification script and expects a successful exit code.
import { exec } from 'child_process';

test('Wattson verification script passes', done => {
    exec('node scripts/verify_wattson.js', (error, stdout, stderr) => {
        // The script prints a success message on stdout.
        expect(error).toBeNull();
        expect(stdout).toContain('✅ Wattson verification passed');
        done();
    });
});
