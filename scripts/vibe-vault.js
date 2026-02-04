/**
 * Vibe Music - Secret Vault
 * Dashboard Edition
 */

const VibeVault = {
    _v: {
        a: "QUl6YVN5QlZkakQ0Qm52OUZUdXppUG5oRDMtR1p4aGNyTldqTG9N",
        b: "dmliZW11c2ljLTc3MjNmLmZpcmViYXNlYXBwLmNvbQ==",
        c: "dmliZW11c2ljLTc3MjNm",
        d: "dmliZW11c2ljLTc3MjNmLmZpcmViYXNlc3RvcmFnZS5hcHA=",
        e: "MzIyNTA0MzgzNTYw",
        f: "MTozMjI1MDQzODM1NjA6YW5kcm9pZDo5YmZkMWVkZmI5NWU2YTYzYjYwYzdk"
    },

    getConfig() {
        return {
            apiKey: atob(this._v.a),
            authDomain: atob(this._v.b),
            projectId: atob(this._v.c),
            storageBucket: atob(this._v.d),
            messagingSenderId: atob(this._v.e),
            appId: atob(this._v.f)
        };
    }
};

// Global for non-module scripts
window.VibeVault = VibeVault;
