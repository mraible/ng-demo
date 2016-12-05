node {
    // uncomment these 2 lines and edit the name 'node-4.4.7' according to what you choose in configuration
    def nodeHome = tool name: 'node-6.9.1', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
    env.PATH = "${nodeHome}/bin:${env.PATH}"

    stage('check tools') {
        sh "node -v"
        sh "npm -v"
    }

    stage('checkout') {
        checkout scm
    }

    stage('npm install') {
        sh "npm install"
    }

    stage('unit tests') {
        sh "ng test --watch false"
    }

    stage('protractor tests') {
        sh '''ng serve &
        ngPid=$!
        sleep 15s
        npm run e2e
        kill $ngPid
        '''
    }

    stage('deploying') {
        sh "git push heroku master"
    }
}
