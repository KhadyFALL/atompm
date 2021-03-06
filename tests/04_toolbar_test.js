
let test_utils = require('./test_utils');
let user = "./users/testuser/";

module.exports = {

    beforeEach: function (client) {
        client.url('http://localhost:8124/atompm').pause(300);
    },

    'Login': function (client) {

        test_utils.login(client);
    },

    'Load main menu toolbar': function (client) {
        let filename = 'Toolbars/MainMenu/MainMenu.buttons.model';
        test_utils.load_toolbar(client, [filename]);
    },

    'Load all toolbars': function (client) {

        console.log("Testing toolbars...");
        test_utils.getFiles(client, user, '/**/*.buttons.model', test_utils.load_toolbar);

        console.log("Testing metamodels...");
        test_utils.getFiles(client, user, '/**/*Icons.metamodel', test_utils.load_toolbar);

        console.log("Testing pattern metamodels...");
        test_utils.getFiles(client, user, '/**/*Icons.pattern.metamodel', test_utils.load_toolbar);
    },

    after: function (client) {
        client.end();
    },


};


