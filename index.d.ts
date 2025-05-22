export = DashHD;

declare namespace DashHD {
    enum Versions {
        'mainnet' = 'mainnet',
        'testnet' = 'testnet',
        'DASH_PKH' = 'DASH_PKH',
        'DASH_PRIV_KEY' = 'DASH_PRIV_KEY',
        'DASH_PKH_TESTNET' = 'DASH_PKH_TESTNET',
        'DASH_PRIV_KEY_TESTNET' = 'DASH_PRIV_KEY_TESTNET',
        'xprv' = 'xprv',
        'tprv' = 'tprv',
        'xpub' = 'xpub',
        'tpub' = 'tpub',
        'XPRV' = 'XPRV',
        'XPUB' = 'XPUB',
        'TPRV' = 'TPRV',
        'TPUB' = 'TPUB',
    }
    
    enum KeyType {
        'private' = 'private',
        'pkh' = 'pkh',
        'xprv' = 'xprv',
        'xpub' = 'xpub',
        '' = ''
    }

    type HDXKeyPartial = {
        deriveAddress: (index: number) => Promise<HDKey>
    }

    type HDXKey = HDKey & HDXKeyPartial

    type HDAccountPartial = {
        deriveXKey: (use: number) => Promise<HDXKey>
    }

    type HDAccount = HDKey & HDAccountPartial

    type HDFromXKeyOptions = {
        versions: HDVersionsOption,
        bip32: boolean,
        normalizePublicKey: boolean
    }

    type HDFromSeedOptions = {
        purpose: number,
        coinType: number,
        versions: Versions,
    }

    type HDVersionsOption = {
        private: number | string,
        public: number | string,
    }

    type HDVersions = {
        private: number,
        public: number,
    }

    type HDKeyOptions = {
        versions?: HDVersionsOption,
        depth?: number,
        parentFingerprint?: number,
        index?: number,
        chainCode?: Uint8Array,
        privateKey?: Uint8Array,
        publicKey?: Uint8Array,
    }

    type HDWalletPartial = {
        deriveAccount: (account: number) => Promise<HDAccount>
    }

    type HDWallet = HDKey & HDWalletPartial

    type HDKey = {
        versions: HDVersions,
        depth: number,
        parentFingerprint: number,
        index: number,
        chainCode: Uint8Array,
        privateKey: Uint8Array | undefined,
        publicKey: Uint8Array,
    }

    type Parts = {
        privateKey?: string,
        compressed?: boolean,
        pubKeyHash?: string,
        xpub?: string,
        xprv?: string,
        check: string,
        type: KeyType,
        valid: boolean,
        version: string
    }

    const MAINNET: HDVersions
    const TESTNET: HDVersions

    const HARDENED: boolean
    const PUBLIC: boolean
    const RECEIVE: number
    const CHANGE: number

    const HARDENED_OFFSET: number

    function create(opts?: HDKeyOptions): HDKey
    function toAddr(pubBytes: Uint8Array, opts?: { version: Versions | number }): Promise<string>
    function toWif (privBytes: Uint8Array, opts?: { version: Versions | number }): Promise<string>
    function toXPrv (hdkey: HDKey, opts?: { version: Versions | number }): Promise<string>
    function toXPrvBytes (hdkey: HDKey, opts?: { version: Versions | number }): Promise<Uint8Array>
    function toXPub (hdkey: HDKey, opts?: { version: Versions | number }): Promise<Uint8Array>
    function toXPubBytes (hdkey: HDKey, opts?: { version: Versions | number }): Promise<Uint8Array>
    function deriveChild (hdkey: HDKey, index: number, hardened: boolean): Promise<HDKey>
    function derivePath (parent: HDKey, path: string): Promise<HDKey>
    function fromSeed (seed: Uint8Array, opts?: HDFromSeedOptions): Promise<HDWallet>
    function fromXKey (xkey: string, opts?: HDFromXKeyOptions): Promise<HDXKey>
    function toId (hdkey: HDKey): Promise<string>
    function toIdBytes (hdkey: HDKey): Promise<Uint8Array>
    function toPublic (hdkey: HDKey): HDKey
    function wipePrivateData (hdkey: HDKey): Promise<HDKey>


    function decode (base58key: string, opts?: {versions: [string, string], xversions: [string, string]}): Promise<Parts>
    function encodeXPrv (keyBytes: Uint8Array, opts?: { version: Versions | number }): Promise<string>
    function encodeXPub (keyBytes: Uint8Array, opts?: { version: Versions | number }): Promise<string>
    function privateKeyTweakAdd (privateKeyBytes: Uint8Array, tweakBytes: Uint8Array): Promise<Uint8Array>
    function publicKeyNormalize (pubBytes: Uint8Array): Promise<Uint8Array>
    function publicKeyTweakAdd (publicKeyBytes: Uint8Array, tweakBytes: Uint8Array): Promise<Uint8Array>
    function ripemd160sum (bytes: Uint8Array): Promise<Uint8Array>
    function sha256sum (bytes: Uint8Array): Promise<Uint8Array>
    function sha512hmac (entropy: Uint8Array, data: Uint8Array): Promise<Uint8Array>
    function bytesToBase64Url (bytes: Uint8Array): string
    function secureErase (buf: Uint8Array): void
    function toPublicKey (privBytes: Uint8Array): Promise<Uint8Array>

    interface Utils {
        decode: typeof decode,
        encodeXPrv: typeof encodeXPrv,
        encodeXPub: typeof encodeXPub,
        privateKeyTweakAdd: typeof privateKeyTweakAdd,
        publicKeyNormalize: typeof publicKeyNormalize,
        publicKeyTweakAdd: typeof publicKeyTweakAdd,
        ripemd160sum: typeof ripemd160sum,
        sha256sum: typeof sha256sum,
        sha512hmac: typeof sha512hmac,
        bytesToBase64Url: typeof bytesToBase64Url,
        secureErase: typeof secureErase,
        toPublicKey: typeof toPublicKey,
    }

    const _utils: Utils
}
