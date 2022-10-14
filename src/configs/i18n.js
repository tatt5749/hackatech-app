export const fallback = "en";

export const supportedLocales = {
    en: {
        name: "English",
        translationFileLoader: () => require('../lang/en.json'),

        // en is default locale in Moment
        momentLocaleLoader: () => Promise.resolve(),
    },
};

export const defaultNamespace = "app";

export const namespaces = [
    "app",
    "input",
    "account",
    "validation",
    "wallet",
];