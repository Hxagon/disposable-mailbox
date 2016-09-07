import phonetic from "phonetic";

class MailboxService {
    /*@ngInject*/
    constructor($http, $log, $state, $stateParams, config) {
        this.$http = $http;
        this.config = config;
    }

    loadEmails(username) {
        return this.$http.get(this.config.backend_url, {params: {username: username, action: "get"}})
            .then(response=> {
                    return response.data;
                }
            );
    }

    generateRandomUsername() {
        let username = phonetic.generate({syllables: 3, phoneticSimplicity: 1});
        if (Math.random() >= 0.5) {
            username += this.getRandomInt(30, 99);
        }
        return username.toLowerCase();
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    cleanUsername(username) {
        return username.replace(/[@].*$/, '');
    }

}

export default MailboxService;