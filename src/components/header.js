import angular from "angular";

class HeaderController {
    /*@ngInject*/
    constructor(mailboxService, $log) {
        this.mailboxService = mailboxService;
        this.$log = $log;

        this.inputFieldUsername = "xxx";
    }

    $onInit() {
        this.$log.debug("init header controller");
        this.inputFieldUsername = this.address;
    }

    $onChange(changes) {
        if (changes.address) {
            this.inputFieldUsername = Object.assign({}, this.address);
            this.address = Object.assign({}, this.address);
        }
    }

    $onDestroy() {
        this.$log.debug("destroying header controller");
    }

    gotoMailbox(username) {
        username = this.mailboxService.cleanUsername(username);
        this.inputFieldUsername = username; // use username until real address has been loaded
        this.address = username; // use username until real address has been loaded
        this.onChangeUsername({
            $event: {
                username: username
            }
        });
    }

    gotoRandomAddress() {
        let username = this.mailboxService.generateRandomUsername();
        this.gotoMailbox(username);
    }


}

const HeaderComponent = {
    bindings: {
        address: '<',
        mailcount: '<',
        onChangeUsername: '&'
    },
    controller: HeaderController,
    template: `
    <div class="nav-container">
    <div class="container">
        <nav class="navbar navbar-light">
            <a class="navbar-brand"><span class="octicon-inbox"></span>
                &nbsp;
                {{$ctrl.address}}
                &nbsp;
                <span ng-if="$ctrl.mailcount" class="tag tag-pill tag-default">{{$ctrl.mailcount}}</span>
            </a>


            <ul class="nav navbar-nav">

                <button type="button nav-link" class="btn btn-outline-primary pull-xs-right"
                        ng-click="$ctrl.gotoRandomAddress()">
                    <span class="glyphicon glyphicon-random"></span>&nbsp;
                    randomize
                </button>

                <form class="form-inline pull-xs-right" ng-submit="$ctrl.gotoMailbox($ctrl.inputFieldUsername)">
                    <input ng-model="$ctrl.inputFieldUsername"
                           placeholder="username"
                           type="text" class="form-control"/>
                    <button type="submit" class="btn btn-outline-success">login</button>
                </form>

            </ul>
        </nav>
    </div>
</div>
  `
};


export default angular
    .module('header', [])
    .component('header', HeaderComponent)
    .name;