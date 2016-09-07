
class MailboxController {
    /*@ngInject*/
    constructor($log, $interval, config, mailboxService, $rootScope, $stateParams, $state) {
        this.$rootScope = $rootScope;
        this.$log = $log;
        this.$interval = $interval;
        this.config = config;
        this.mailboxService = mailboxService;
        this.mails = [];
        this.$stateParams = $stateParams;
        this.$state = $state;
        this.address = null; // is set when mails are loaded
        this.state = 'home';
    }

    $onInit() {
        if (this.getCurrentUsername()) {
            this.state = 'loading';
            this.address = this.getCurrentUsername(); // use username until real address has been loaded
            this.intervalPromise = this.$interval(() => this.loadMails(), this.config.reload_interval_ms);
            this.loadMails();
        }
    }


    gotoMailbox({username}) {
        username = this.mailboxService.cleanUsername(username);
        this.address = username; // use username until real address has been loaded
        this.$state.go('inbox', {username: username});
    }


    $onDestroy() {
        this.$log.debug("destroying controller");
        this.$interval.cancel(this.intervalPromise);
    }


    loadMails() {
        this.mailboxService.loadEmails(this.getCurrentUsername())
            .then(data => {

                this.mails = data.mails;
                if (this.mails.length !== 0) {
                    this.state = 'list';
                } else {
                    this.state = 'empty';
                }
                this.address = data.address;
                this.loadingData = false;
            });
    }


    getCurrentUsername() {
        return this.$stateParams.username;
    }


}

export default MailboxController;