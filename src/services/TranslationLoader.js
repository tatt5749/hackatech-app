import * as config from '../configs/i18n';

const TranslationLoader = {
    type: 'backend',
    init: () => {},
    read: function(language, namespace, callback) {
        let resource, error = null;
        try {
            resource = config
                .supportedLocales[language]
                .translationFileLoader()[namespace];
        } catch (_error) { error = _error;}

        callback(error, resource);
        
    },
};

export default TranslationLoader;