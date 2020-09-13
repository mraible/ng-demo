node {
    def nodeHome = tool name: 'node-14.x', type: 'jenkins.plugins.nodejs.tools.NodeJSInstallation'
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
        sh "npm test -- --watch=false"
    }

    stage('protractor tests') {
        sh "npm run e2e"
    }
}
