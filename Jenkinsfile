pipeline {
    agent any
    stages {
        stage('Clean') {
            steps {
                cleanWs()
            }
        }
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build') {
            steps {
                script {
                    def branch = env.GIT_BRANCH?.replaceAll('origin/', '').trim()
                    echo "Building branch: ${branch}"
                }
            }
        }
        stage('Test') {
            steps {
                script {
                    def branch = env.GIT_BRANCH?.replaceAll('origin/', '').trim()
                    echo "Running tests for branch: ${branch}"
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    def branch = env.GIT_BRANCH?.replaceAll('origin/', '').trim()
                    echo "Deploying branch: ${branch}"
                    if (branch == 'main') {
                        sh '''
                            sudo rm -rf /var/www/myapp/main/*
                            sudo cp -r * /var/www/myapp/main/
                        '''
                        echo 'Main deployed successfully!'
                    }
                    else if (branch == 'dev') {
                        sh '''
                            sudo rm -rf /var/www/myapp/dev/*
                            sudo cp -r * /var/www/myapp/dev/
                        '''
                        echo 'Dev deployed successfully!'
                    }
                    else if (branch == 'feature') {
                        sh '''
                            sudo rm -rf /var/www/myapp/feature/*
                            sudo cp -r * /var/www/myapp/feature/
                        '''
                        echo 'Feature deployed successfully!'
                    }
                    else {
                        echo "Branch '${branch}' not configured."
                    }
                }
            }
        }
    }
    post {
        success { echo "Success: ${env.GIT_BRANCH}" }
        failure { echo "Failed: ${env.GIT_BRANCH}" }
    }
}
