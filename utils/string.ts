export default function languageCase(en: string, es: string, it: string) {
    switch (document.documentElement.lang) {
        case 'en':
            return en;
        case 'es':
            return es;
        case 'it':
            return it;
    }
}
